import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string;
    status: string;
}

/**
 * Purpose: some dynamic data we have to fetch before a route can be displayed or can be rendered.
 * 
 * Maybe I want to load the individual server from some back-end.
 * => need Resolver, which is also a service, just like canActivate or canDeactivate which will allow us
 *    to run some code before a route is rendered.
 * 
 * Difference to canActivate is that
 * - the resolver will not decide whetehr this route should be rendered or not,
 *   whether the component should be loaded or not.
 * - the resolver will always render the component in the end but it will do some pre-loading, i can say,
 *   it will fetch some data the component will then need later on.
 * - the alternative is to render the component or the target page instantly and in the onInit method of this page,
 *   i could then fetch the data and display some spinner whilst i am doing so. (which is an alternative)
 * 
 *   BUT, if i want to load it before atually displaying the route, this is how i would add such a resolver
 * 
 */
@Injectable()   // This resolver will give us in the end, to what it will resolve in the end.
export class ServerResolver implements Resolve<Server> {
    
    constructor(private serversService: ServersService) {}
    
    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        /**
         * easiest way of using this resolver which will do the loading of our data in advance
         * and now this would also work if this were return an observable or a promise, so with asynchronous code, for example an HTTP request.
         * 
         * we want to outsource this becuz let's say we want to do it before it loads,
         * the good thing is we do get the route here, it only is snapshot but this service here will actually run each time we rerendered the route,
         * so the snapshot is all we need.
         * Unlike the component itself, again this is executed each time, so no need to set up an observable or something like that.
         */
        return this.serversService.getServer(+route.params['id']);
    }
}