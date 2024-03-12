import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Component} from '@angular/core';
import { ComponentDecorator} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';

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
}

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
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss']
})

export class StarshipsListComponent {

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private subscription: Subscription;
  private cartCounter: any;
  private cart_btn_text: string = "Add to Cart";
  repos: Starship[];

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
      this.listStarships();
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
        };

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Add counter
     */
    addCounter(starship: Starship ): void
    {      
      console.log("addCounter");
      this._fuseUtilsService.nextCount();
   
      var cart = new Cart();
      cart.user = 4;
      cart.product = starship.id;
      cart.quantity = 1;
      cart.name = starship.name;
      cart.description = starship.starship_class;
      cart.image = starship.image;
      cart.price = +starship.cost_in_credits;

      this._httpClient.post<any>('http://localhost:8080/api/cart/add', cart, { withCredentials: true }).subscribe((response) => {
          console.log("response"); 
        },
        (error) => { //Error callback                             
          console.error('Request failed with error')
          alert(error);
        },
        () => { //Complete callback                                  
          console.log('Request completed')
        });
    }

   /**
     * Remove counter
     */
   removeCounter(): void
   {
     //this.cartCounter = this.cartCounter + 1;
     this._fuseUtilsService.nextCount();
   }

   listStarships(): void
   { //https://localhost:32772/api/Starships
    this._httpClient.get<Starship[]>('https://localhost:32772/api/Starships').subscribe((response) => {
     //Next callback
       this.repos = response; 
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
