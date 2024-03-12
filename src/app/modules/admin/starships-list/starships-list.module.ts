import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { StarshipsListComponent } from 'app/modules/admin/starships-list/starships-list.component';

const starshipsListRoutes: Route[] = [
    {
        path     : '',
        component: StarshipsListComponent
    }
];

@NgModule({
    declarations: [
        StarshipsListComponent
    ],
    imports     : [
        RouterModule.forChild(starshipsListRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTooltipModule,
        SharedModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule
    ]
})
export class StarshipsListModule
{
}
