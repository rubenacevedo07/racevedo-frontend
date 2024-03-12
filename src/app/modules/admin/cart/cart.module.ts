import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CartComponent } from 'app/modules/admin/cart/cart.component';
import { MatTableModule } from '@angular/material/table'

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
    imports     : [
        RouterModule.forChild(cartRoutes),
        MatTableModule
    ]
})
export class CartModule
{
}
