import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ServersComponent } from "./servers/servers.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent},
    ] },
    // make sure that servers is now only accessible and all the child routes,
    // only accessible if the auth gaurd canActivated method returns true in the end
    // which will only happen if in the auth servicem loggedIn is set to true
    { path: 'servers',
      //canActivate: [AuthGuard]
      canActivateChild: [AuthGuard], component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ]},
    // { path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    // ** should be always last of this array. becuz parsing of top to bottom way
    { path: '**', redirectTo: '/not-found'}
  ];

/**
 * 
 * The server hosting your Angular single page application has to be configured such that in a case of a 404 error
 * it returns the index.html file, so the file starting and containing your Angular app.
 * Why?
 * All our URLs are pared by the server first, so not by Angular, by the server
 * 
 * Now If i have /servers here, it will look for a /servers route on our server, on the real server hsoting our web app.
 * Now chances are i don't have that route here because i only have one file there, index.html containing my Angular app
 * and i want Angular to take over and to parse this route.
 * but it will never get a chance, if our server, the server hosting our app decides no, i don't know the route, here's your 404 error page.
 * 
 * Therefore we need to make sure that in such a case, our web sever returns the index.html file.
 * If for some reason, we can't get this to work or we need to support very old broswers which are not able to parse paths like this in the client
 * which Angular does then, we have an alternative approach to using this nice URLs which look like all the URLs in the web.
 * We can fallback to our older technique which was used a couple of years ago, using a hsh sign in our routes.
 * 
 * useHash default is true
 * 
 * After setting useHash true, it becomes hash mode routing
 * Then URL become like localhost:4200/#/ , localhost:4200/#/server , localhost:4200/#/users
 * 
 * What the hashtag will do is, it informs our web server, 
 * 'hey only care about the part in this URL 'localhost:4200' before the hashtag
 * So all the parts thereafter will be ignored by our web server
 * 
 * Therefore this will run even on servers which don't return the index.html file in case of 404 errors
 * because they will only care about the part in front of the hashtag.
 * That's how it works by default and the part after the hashtag can now be pared by our client, by Angular.
 * 
 * if we cannot get the other approach to work, however i will say that definitely we should try to use
 * the more prettier routes, using the HTML history mode as it is called with the normal slash routes without the hashtag
 * 
 * the other mode which gives us cleaner routes which really look a lot nicer and more like you're used to seeing routes from other web apps.
 */

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}