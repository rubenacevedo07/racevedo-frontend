import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Component, ViewChild, inject } from '@angular/core';
import { ComponentDecorator } from '@angular/core';
import { Subject, Timestamp, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { environment } from 'environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { CartService } from 'app/layout/common/cart/cart.service';
import { OrderService } from './order.service';

// //p.name, p.price, p.quantity, p.subtotal, o.id, o.total
export class OrderProduct {
  id: number
  name: string
  price: number
  quantity: number
  subtotal: number
}

export class Orders {
  id: number
  total: number
  productCounter: number
  orderDateTime: Date
  date: number
  hour: number
  orderProducts: OrderProduct[] = [];
}


/**
 * Order

id, userEmail, total, productCounter, 

OrderProduct(id, name, product_id, price, quantity, subtotal)
 */

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent {
  @ViewChild(MatTable, {static: false}) table: MatTable<OrderProduct>;
  private orderService = inject(OrderService);
  empty: boolean = true;
  isLoading: boolean = true;
  orders: Orders[] = [];
  orders_: Orders[] = [];
  displayedColumns: string[] = ['name', 'price', 'quantity', 'subtotal'];

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.empty = false;
    this.orderService.listOrderItems().subscribe(
      (orders) => {
        // Handle successful response with the array of starships
        console.log('Orders:', orders);
        this.orders = orders;
      },
      (error) => {
        // Handle error scenario
        console.error('Error fetching starships:', error);
      }
    );
  }

  
}
