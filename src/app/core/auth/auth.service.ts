import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { AuthSession } from 'app/core/auth/auth.session';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { CartService } from 'app/layout/common/cart/cart.service';
import { environment } from 'environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private _cartService = inject(CartService);
    private _authenticated: boolean = false;
    private _init: boolean = true;

  
    private url = environment.backendUrl;
    /**
     * Constructor
     */
    constructor(private _authSession: AuthSession) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string ; rememberMe: boolean;}): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post(this.url + '/api/v1/auth/login', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                if( credentials.rememberMe == true ){
                    this.accessToken = response.accessToken;
                } 

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Update the cart counter
                this._cartService.setCartCount(response.user.counter);

                // Return a new observable with the response
                return of(response);
            }),
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post(this.url + '/api/v1/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            switchMap((response: any) => {
                // Update logic based on successful response
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }
                this._authenticated = true;
                this._userService.user = response.user;
                this._cartService.setCartCount(response.user.counter);

                return of(true); // Return true on success
            }),
            catchError(error => {
                // Handle errors here
                console.error('Error signing in:', error); // Or handle error as needed
                return of(false); // Return false on error
            })
        )
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post(this.url + '/api/v1/auth/forgot-password', {
            email: email
        }).pipe(
            switchMap((response: any) => {
                return of(true); // Return true on success
            }),
            catchError(error => {
                // Handle errors here
                console.error('Error signing in:', error); // Or handle error as needed
                return of(false); // Return false on error
            })
        )
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(token: string, passwod: string): Observable<any> {
        return this._httpClient.post(this.url + '/api/v1/auth/reset-password', {
            token: token,
            newPassword: passwod
        }).pipe(
            switchMap((response: any) => {
                return of(true); // Return true on success
            }),
            catchError(error => {
                // Handle errors here
                console.error('Error signing in:', error); // Or handle error as needed
                return of(false); // Return false on error
            })
        )
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post(this.url + '/api/v1/auth/register', user).pipe(
            switchMap((response: any) => {
                return of(response);
            }),
            catchError(error => {
                // Handle errors here
                console.error('Error signing in:', error); // Or handle error as needed
                return of(false); // Return false on error
            })
        )
    }
    
    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        /*if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }*/

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
