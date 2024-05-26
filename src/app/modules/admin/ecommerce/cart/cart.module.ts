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
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

const cartRoutes: Route[] = [
    {
        path     : '',
        component: CartComponent
    }
];

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        RouterModule.forChild(cartRoutes),
        MatTableModule,
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
        FuseAlertComponent,
        MatSnackBarModule,
        MatIconModule
    ]
})
export class CartModule
{
}
