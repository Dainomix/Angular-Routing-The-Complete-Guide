import { Observable } from "rxjs/Observable";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    /**
     * canDeactivate method which will be called by the Angular router once we try to leave a route.
     * Therefore this will have the component on which we're currently on as an argument
     * and this component needs to be of type CanComponentDeactivate, which means it needs to be a component
     * which has this interface here implemented, therefore a component which has a canDeactivate method,
     * 
     */
    canDeactivate(component: CanComponentDeactivate,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        /**
         * This is why i need to implement this interface in this component,
         * why i created this interface in the first place because now,
         * the Angular router can execute canDeactivate in our service and can rely on the fact that
         * the component we're currently on has the canDeactivate method too
         * because this is what we will actually implement the logic checking whether we are allowed to leave or not
         * because we need this connection between our guard and the component.
         * So this is why we can safely call canDeactivate here
         */
        return component.canDeactivate();
    }
}