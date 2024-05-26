import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FuseUtilsService
{
    private cartCounter: number = 0;
    count: BehaviorSubject<number>;
    /**
     * Constructor
     */
    constructor()
    {
        this.count = new BehaviorSubject(this.cartCounter);
    }

    nextCount() {
        this.count.next(++this.cartCounter);
    }

    setCounter(counter : number) {
        //console.log("setCounter");
        this.count.next(this.cartCounter = counter);
    }

    removeCount() {
        this.count.next(--this.cartCounter);
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = true".
     */
    get exactMatchOptions(): IsActiveMatchOptions
    {
        return {
            paths       : 'exact',
            fragment    : 'ignored',
            matrixParams: 'ignored',
            queryParams : 'exact',
        };
    }

    /**
     * Get the equivalent "IsActiveMatchOptions" options for "exact = false".
     */
    get subsetMatchOptions(): IsActiveMatchOptions
    {
        return {
            paths       : 'subset',
            fragment    : 'ignored',
            matrixParams: 'ignored',
            queryParams : 'subset',
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Generates a random id
     *
     * @param length
     */
    randomId(length: number = 10): string
    {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let name = '';

        for ( let i = 0; i < 10; i++ )
        {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return name;
    }
}
