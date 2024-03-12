import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector       : 'maintenance',
    templateUrl    : './maintenance.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
})
export class MaintenanceComponent
{
    /**
     * Constructor
     */
    constructor(private _router: Router,)
    {
    }
}
