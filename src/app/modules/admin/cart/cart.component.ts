import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Component} from '@angular/core';
import { ComponentDecorator} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';

export class Cart {
  user: number
  product: number
  quantity: number
  name: string
  description: string
  image: string
  price: number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  /**
   *  user: number
  product: number
  quantity: number
  name: string
  description: string
  image: string
  price: number
   */
  displayedColumns: string[] = ['name', 'description', 'quantity', 'price'];
  dataSource!: any;
  isLoading = true;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private cartCounter: any;
  private cart_btn_text: string = "Add to Cart";
  shoppingCart!: any;
  private total: number = 0;
  private quantity: number = 0;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, 
              private _fuseMediaWatcherService: FuseMediaWatcherService,
              private _fuseUtilsService: FuseUtilsService)
  {
   
  }

  // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.listShoppingCart();
      // Subscribe to media changes
      this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {

              // Set the drawerMode and drawerOpened if
              if ( matchingAliases.includes('lg') )
              {
                  this.drawerMode = 'side';
                  this.drawerOpened = true;
              }
              else
              {
                  this.drawerMode = 'over';
                  this.drawerOpened = false;
              }
          });
        }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }  
  
    
    listShoppingCart(): void
    { 
      this._httpClient.get<Cart[]>('http://localhost:8080/api/cart/4').subscribe((response) => {
      //Next callback
        console.error('Request failed with error', response)
        this.shoppingCart = response; 
        console.log(this.shoppingCart.map(t => t.price));
        var prices = this.shoppingCart.map(t => t.price);
        console.log(this.shoppingCart.map(t => t.quantity));
        var quantities = this.shoppingCart.map(t => t.quantity);
        this.total = prices.reduce((acc, curr) => acc + curr)
        this.quantity = quantities.reduce((acc, curr) => acc + curr)
         
      }),
      (error) => { //Error callback
        console.error('Request failed with error')
        alert(error);
      },
      () => { //Complete callback
        console.log('Request completed')
      }
   }
}

