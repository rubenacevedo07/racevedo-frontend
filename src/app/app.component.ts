import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.checkCookie();
    }

    checkCookie() {
        this.authService.check().subscribe({
            next: (data) => {
                // Handle successful data retrieval
                //console.log('Cookie is valid:', data);
              },
              error: (error) => {
                // Handle error
                console.error('Error checking cookie:', error);
              },
              complete: () => {
                // Handle completion (optional)
                //console.log('Complete');
              }
        });
    }
}