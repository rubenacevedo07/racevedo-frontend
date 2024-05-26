import { Component, OnInit } from '@angular/core';
import { ComponentDecorator } from '@angular/core';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'app/core/user/user.service';
import { CartService } from 'app/layout/common/cart/cart.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../../../layout/common/cart/loading.service'; // Import the service

export interface Starship {
  id: number
  name: string
  model: string
  manufacturer: string
  cost_in_credits: number
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  mglt: string
  starship_class: string
  pilots: any[]
  films: string[]
  created: string
  edited: string
  image: string
  url: string
  value: string
}

export class Cart {
  userID: number
  product: number
  quantity: number
  name: string
  description: string
  image: string
  price: number
}

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styles: [
    `
        cards fuse-card {
            margin: 16px;
        }
    `,
  ],
  styleUrls: ['./starships-list.component.scss'],
})

export class StarshipsListComponent implements OnInit {
  isLoading$ = this.loadingService.isLoading$; // Subscribe to the observable

  private cartService = inject(CartService);
  private _userService = inject(UserService);
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  repos: Starship[];
  columns: number = 4;
  possibleValues: number[] = [1, 2, 3, 4, 5];

  selectedValue: number = 1;
  length = 50;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  selectedQuantity: { [productId: number]: number } = {};

  // Paginator event
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }



  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient,
    private _fuseUtilsService: FuseUtilsService,
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //        
    this.loadingService.hideLoading();
    this.cartService.listStarships().subscribe(
      (starships) => {
        // Response with the array of starships
        this.repos = starships;
      },
      (error) => {
        // Handle error scenario
        console.error('Error fetching starships:', error);
      }
    );
    this.loadingService.showLoading();
  };

  /**
   * Add counter
   */
  addCounter(item: Starship): void {
    const quantity = this.selectedQuantity[item.id];

    this.cartService.addProduct(item.id, quantity, item.name, item.image, item.cost_in_credits);
    this.openSnackBar("Ship added!", "");
  }

  /**
    * Remove counter
    */
  removeCounter(): void {
    this._fuseUtilsService.nextCount();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['custom-snackbar', 'snackbar-success']
    });
  }
}
