import { AuthenticationService } from './../_services/authentication-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService

    ) {}

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // user is authorized so return true
            return true;
        }
        // user is not logged in so redirect to login page
        // return url;
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;

    }
}
