import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild, inject } from '@angular/core';
import { Item } from 'app/layout/common/cart/item.type';
import { map, Observable, BehaviorSubject, ReplaySubject, tap, Subject, catchError, throwError } from 'rxjs';

import { environment } from 'environment';


export class Orders {
    id: number
    total: number
    productCounter: number
    orderDateTime: Date
    date: number
    hour: number
    orderProducts: OrderProduct[] = [];
}

export class OrderProduct {
    id: number
    name: string
    price: number
    quantity: number
    subtotal: number
}



@Injectable({ providedIn: 'root' })
export class OrderService {
    private _httpClient = inject(HttpClient);

    listOrderItems(): Observable<Orders[]> {
        return this._httpClient.post<Orders[]>(environment.backendUrl + '/api/v1/order/all', {})
            .pipe(
                map((response) => response), // No need to assign to a variable, directly return response
                catchError((error) => {
                    console.error('Request failed with error:', error);
                    return throwError(error); // Re-throw the error to signal failure
                })
            );
    }
}
