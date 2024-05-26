import { Route, CanActivateFn } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { ContactComponent } from 'app/modules/admin/me/contact/contact.component';
import { UserComponent } from 'app/modules/admin/user/user.component';
import { SoftwareComponent } from 'app/modules/admin/ecommerce/software/software.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch : 'full', redirectTo: 'software' },

    // Redirect signed-in user to the '/starships-list'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'software' },
    //{ path: 'maintenance', pathMatch : 'full', redirectTo: 'maintenance' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            //{path: 'maintenance', loadChildren: () => import('app/modules/auth/maintenance/maintenance.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'starships-list', loadChildren: () => import('app/modules/admin/ecommerce/starships-list/starships-list.module').then(m => m.StarshipsListModule)},
            {path: 'cart', loadChildren: () => import('app/modules/admin/ecommerce/cart/cart.module').then(m => m.CartModule)},
            {path: 'orders', loadChildren: () => import('app/modules/admin/ecommerce/orders/order.module').then(m => m.OrderModule)},
            {path: 'profile', loadChildren: () => import('app/modules/admin/me/profile/profile.module').then(m => m.ProfileModule)},
            {path: 'contact', component: ContactComponent},
            {path: 'software', component: SoftwareComponent},
            {path: 'user', component: UserComponent},
            
        ]
    }
];
