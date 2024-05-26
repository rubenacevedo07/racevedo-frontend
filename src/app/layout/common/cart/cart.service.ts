import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild, inject } from '@angular/core';
import { Item } from 'app/layout/common/cart/item.type';
import { map, Observable, BehaviorSubject, ReplaySubject, tap, Subject, catchError, throwError } from 'rxjs';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { items } from '../../../mock-api/apps/file-manager/data';
import { environment } from 'environment';
import { LoadingService } from './loading.service'; // Import the service


interface itemRequest {
    productid: number
    productname: string
    photo: string
    price: number
    quantity: number
    subtotal: number
}

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


@Injectable({ providedIn: 'root' })
export class CartService {
    private _httpClient = inject(HttpClient);

    private cartItems: Item[] = [];
    cartItemsCount$ = new BehaviorSubject<number>(0); // Observable for the cart item count

  /**
   * Constructor
   */
  constructor(private loadingService: LoadingService) {
  }
    addProduct(productId: number, quantity: number, name: string, photo: string, price: number): void {
        //const existingItem = this.cartItems.find(item => item.productId === productId);
        /*if (existingItem) {
            existingItem.quantity += quantity;
        } else {*/
        this.cartItems.push({ productId, quantity });
        var subtotal = price * quantity;
        var cart: itemRequest = {
            productid: productId,
            productname: name,
            photo: photo,
            price: price,
            quantity: quantity,
            subtotal: subtotal
        };

        this._httpClient.post<number>(environment.backendUrl + '/api/v1/cart/add', cart, {
            withCredentials: true
        })
            .subscribe(
                (response) => {
                    //console.log(response);
                    var count: number = response;
                    this.setCartCount(count);
                    // Handle successful response
                },
                (error) => {
                    // Handle error
                    console.error('Request failed with error:', error);
                },
                () => {
                    // Request completed (optional)
                }
            );
    }

    removeProduct(productId: number): void {
        const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
        if (itemIndex !== -1) {
            this.cartItems.splice(itemIndex, 1);
        }
        this.updateCartCount();
    }

    private updateCartCount(): void {
        this.cartItemsCount$.next(this.cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }

    setCartCount(counter: number): void {
        this.cartItemsCount$.next(counter);
    }

    listStarships(): Observable<Starship[]> {

        return this._httpClient.get<Starship[]>('assets/starships.json')
          .pipe(
            map((response) => response), // No need to assign to a variable, directly return response
            catchError((error) => {
              console.error('Request failed with error:', error);
              return throwError(error); // Re-throw the error to signal failure
            })
          );
      }
}
