import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CartComponent } from 'app/modules/admin/ecommerce/cart/cart.component';
import { MatTableModule } from '@angular/material/table'
import { FuseCardComponent } from "@fuse/components/card/card.component";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { OrderComponent } from './order.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const ordersRoutes: Route[] = [
  {
      path     : '',
      component: OrderComponent
  }
];

@NgModule({
    declarations: [
      OrderComponent
    ],
    imports     : [
        RouterModule.forChild(ordersRoutes),
        MatTableModule,
        MatIconModule,
        FuseCardComponent,
        MatButtonModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule, 
        MatOptionModule,
        MatDatepickerModule,
        MatSelectModule,
        MatExpansionModule
    ]
})
export class OrderModule
{
}
