import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";

import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService:AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isauthenticated()
            .then(
                (authenticated: boolean) => {
                    if(authenticated) {
                        return true;
                    } else {
                        // After navigating away, we may also 'return false' - though we will prevent the original navigation from happening aways
                        this.router.navigate(['/']);
                        return false;
                    }
                }
            )
    }
}