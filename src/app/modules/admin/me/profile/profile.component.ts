import { NgModule, Component, ElementRef, Renderer2, Injectable } from '@angular/core';
import { FuseLoadingService } from '@fuse/services/loading';

@Injectable({
    providedIn: 'root',
})

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    cv = false;
    certifications = true;
    contact = false;
    isActive = false;
    loading = true;
    /**
     * Constructor
     */
    constructor(private elementRef: ElementRef, private renderer: Renderer2,
                private _fuseLoadingService: FuseLoadingService) {
    }

    ngOnInit() {
        this._fuseLoadingService.show();
        this.delay(500); // Wait for 500 milliseconds
        this._fuseLoadingService.hide();
    }

    async delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    showCertifications() {
        this.certifications = true;
        this.cv = false;
        this.opcSelected(true, false);
    }

    showCV() {
        this.certifications = false;
        this.cv = true;
        this.opcSelected(false, true);
    }

    opcSelected(cert: boolean, cv: boolean) {
        const _cert = this.elementRef.nativeElement.querySelector(`#cert`);
        const _cv = this.elementRef.nativeElement.querySelector(`#cv`);
        if (cert) {
            this.renderer.removeClass(_cv, 'text-primary');
            this.renderer.addClass(_cert, 'text-primary');
        } else if (cv) {
            this.renderer.removeClass(_cert, 'text-primary');
            this.renderer.addClass(_cv, 'text-primary');
        } 
    }
}
