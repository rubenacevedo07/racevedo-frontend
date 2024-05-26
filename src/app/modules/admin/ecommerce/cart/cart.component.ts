import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Component, ViewChild, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { environment } from 'environment';
import { MatTable } from '@angular/material/table';
import { FuseAlertType } from '@fuse/components/alert';
import { CartService } from 'app/layout/common/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface cartRequest {
  userid: number
}

export class Cart {
  id: number
  photo: string
  price: number
  product: number
  productname: string
  quantity: number
  userID: string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent {
  @ViewChild(MatTable, { static: false }) table: MatTable<Cart>;
  @ViewChild('myInput') myInputElement: HTMLInputElement;
  myNumber: number = 0; // Initial value
  private cartService = inject(CartService);
  productCounter: number = 0;
  priceTotal: number = 0;
  displayedColumns: string[] = ['productname', 'price', 'quantity', 'delete'];
  dataSource!: any;
  isLoading: boolean = true;
  empty: boolean = true;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private cart_btn_text: string = "Add to Cart";
  shoppingCart: Cart[] = [];
  cartItems: Cart[] = [];
  cartData: Cart[] = [];
  possibleValues: number[] = [1, 2, 3, 4, 5];
  selectedQuantity: { [productId: number]: number } = {};
  showAlert: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseUtilsService: FuseUtilsService,
    private _snackBar: MatSnackBar) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.listShoppingCart();
    // Set the alert
    this.alert = {
      type: 'success',
      message: 'Your order was successful',
    };

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {

        // Set the drawerMode and drawerOpened if
        if (matchingAliases.includes('lg')) {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  listShoppingCart(): void {
    this._httpClient.post<Cart[]>(environment.backendUrl + '/api/v1/cart/all', {}).subscribe((response) => {
      //Next callback
      this.isLoading = false;
      if (response.length === 0) {
      } else {
        this.empty = false;
        this.shoppingCart = response;
        this.calculateTotalPrice();
      }

    }),
      (error) => { //Error callback
        console.error('Request failed with error')
      },
      () => { //Complete callback
        //console.log('Request completed')
      }
  }

  calculateTotalPrice(): void {
    this.sortCartItems();
    let total: number = 0;
    for (const item of this.shoppingCart) {
      total += item.quantity * item.price;
    }
    console.log("cart empty");
    if (total == 0) { this.empty = true }
    this.priceTotal = total;
    //updateCartCount
    this.cartService.setCartCount(this.shoppingCart.reduce((sum, row) => sum + row['quantity'], 0));
  }

  setOrder(): void {
    this._httpClient.post<Cart[]>(environment.backendUrl + '/api/v1/order/add', { cart: this.shoppingCart, total: this.priceTotal }, { withCredentials: true }).subscribe((response) => {
      //Next callback
      console.log(response);
      this.showAlert = true;
      this.empty = true;
      this.cartService.setCartCount(0);
      // Show the alert
    }),
      (error) => { //Error callback
        console.error('Request failed with error')
      },
      () => { //Complete callback
        console.log('Request completed')
      }
  }

  deleteCartItem(id: any, i: any) {
    this.shoppingCart.splice(i, 1);
    this.calculateTotalPrice();
    this.table.renderRows();
    this._httpClient.post<Cart[]>(environment.backendUrl + '/api/v1/cart/delete', { id: id }, { withCredentials: true }).subscribe((response) => {
      //Next callback
      console.log(response);
    }),
      (error) => { //Error callback
        console.error('Request failed with error')
      },
      () => { //Complete callback
        console.log('Request completed')
      }
  }

  editCartItem(id: any, quantity: any, index: any) {
    if (quantity == 0) {
      this.deleteCartItem(id, index);
    } else {
      if (isNaN(quantity) || quantity == null) {
        quantity = 1;
      } else if (quantity < 0 || quantity > 20) {
        quantity = Math.max(0, Math.min(20, quantity)); // Reset to valid range
      }
      this.setInputValue(id, quantity, index);
    }
    this.calculateTotalPrice();
  }

  setInputValue(id: any, quantity: any, index: any) {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = quantity;
    }
    this.shoppingCart[index].quantity = quantity;
    this._httpClient.post<Cart[]>(environment.backendUrl + '/api/v1/cart/edit', { id: id, quantity: quantity }, { withCredentials: true }).subscribe((response) => {
      //Next callback
      console.log(response);
    }),
      (error) => { //Error callback
        console.error('Request failed with error')
      },
      () => { //Complete callback
        console.log('Request completed')
      }
  }
  /*onSelectEvent(value: any, id: any, i: any) {
    if (value === undefined) {
      this.deleteCartItem(id, i)
    } else {
      this.editCartItem(value, id, i)
    }
  }*/

  sortCartItems(): void {
    this.shoppingCart.sort((a, b) => {
      if (a.productname < b.productname) {
        return -1;
      }
      if (a.productname > b.productname) {
        return 1;
      }
      return 0;
    });
  }

  /*onQuantityChange(id: number, quantity: number) {
     //const inputElement = event.target as HTMLInputElement;
     if (isNaN(quantity) || quantity == null) {
       quantity = 1;
       this.setInputValue(id, quantity);
     } else if (quantity < 0 || quantity > 20) {
       quantity = Math.max(0, Math.min(20, quantity)); // Reset to valid range
       this.setInputValue(id, quantity);
     }
     this.calculateTotalPrice();
     this._httpClient.post<Cart[]>(environment.backendUrl + '/api/v1/cart/edit', { id: id, quantity: quantity }, { withCredentials: true }).subscribe((response) => {
       //Next callback
       console.log(response);
     }),
       (error) => { //Error callback
         console.error('Request failed with error')
       },
       () => { //Complete callback
         console.log('Request completed')
       }
   }*/


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['custom-snackbar', 'snackbar-error']
    });
  }
}

