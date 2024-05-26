import { Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class AuthSession {
    /**
     * Constructor
     */
    constructor(
        private _authSession: CookieService
    )
    {}

    private tokenSubject = new Subject<string>();
    private authSubject = new Subject<boolean>();
  
    setToken(token: string): void {
      this._authSession.set('token', token);
      //console.log('setToken', Boolean);
    }
  
    removeToken(): void {
       this._authSession.delete('token');
    }
  
    getToken(): string | null {
      return this._authSession.get('token');
    }

    getAll(): { [key: string]: string } {
      return this._authSession.getAll();
    }
  
    tokenChanges(): Observable<string> {
      return this.tokenSubject.asObservable();
    }

  }