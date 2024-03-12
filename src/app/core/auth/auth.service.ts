import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { AuthSession } from 'app/core/auth/auth.session';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;
    private url = 'https://first-rac-backend-az.azurewebsites.net';
    //private apiUrl = 'http://localhost:8080/api/v1/auth/validate';
    private apiUrl = 'https://first-rac-backend-az.azurewebsites.net/api/v1/auth/validate';
    //private apiUrlDeleteToken = 'http://localhost:8080/api/v1/auth/delete-token';
    private apiUrlDeleteToken = 'https://first-rac-backend-az.azurewebsites.net/api/v1/auth/delete-token';
    /**
     * Constructor
     */
    constructor(private _httpClient:  HttpClient,
                private _userService: UserService,
                private _authSession: AuthSession) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /** Sign in **/
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( !this._authSession.getToken() )
        {
            this.signInUsingToken();
        }

        return this._httpClient.post( this.url + '/api/v1/auth/login', credentials, { withCredentials: true }).pipe(
            switchMap((response: any) =>
            {                
                // Set the authenticated flag to true
                this._authSession.setToken(response.user.email);   
                // Set the user object in the user service
                this._userService.user = response.user;

                return of(response);
            }),
        );
    }

    /** Sign in using the access token **/
    signInUsingToken(): Observable<boolean>{
        // add encryption to the username
        var username = this._authSession.getToken();   
        this._httpClient.post(this.apiUrl, { username: username}, { withCredentials: true }).subscribe(
          (response: any) => {
            // Handle the response
            // Set the authenticated flag to true
            this._authenticated = true;
            /*const user = { id: "3", name: "Brian Hughes!", email: "rac@gmail.com", 
             avatar: "assets/images/avatars/brian-hughes.jpg", status: "online" };*/

            // Set the user object in the user service
            this._userService.user = response.user;

            // Return a new observable with the response
            return of(response);
            // Store the user on the user service
            //this._userService.user = response.user;
          },
          (error) => {
            // Handle the error
            return of(false);
          }
        );
        return of(false);
    }        

    /** Check the authentication status **/
    check(): Observable<boolean>
    {
       
        // Check the access token availability
        if ( !this._authSession.getToken() )
        {
            return of(false);
        } else {    
            this.signInUsingToken();
        }

        // Check if the user is logged in
        if ( this._authSession.getToken() )
        {
            return of(true);
        }
        
        return this.signInUsingToken();
     }


    /** Forgot password **/
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /** Reset password **/
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }
    
    /** Unlock session **/
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /** Sign out **/
    signOut(): Observable<any>
    {
        const authToken = this._authSession.getToken();
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false        
        this._authSession.removeToken();

        return this._httpClient.post(this.url + '/api/v1/auth/revoke-token', { token: authToken } ).pipe(
            switchMap((response: any) =>
                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {    
                console.log(response);  
                return of(true);
            }),
        );
    }
    
    /** Sign up **/
    signUp(user: { firstname: string; lastname: string; email: string; password: string; role: string; }): Observable<any>
    {
        console.log(user);
        return this._httpClient.post(this.url + '/api/v1/auth/register', user);
    }
}
