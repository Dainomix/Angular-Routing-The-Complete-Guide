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

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent},
    ] },
    // make sure that servers is now only accessible and all the child routes,
    // only accessible if the auth gaurd canActivated method returns true in the end
    // which will only happen if in the auth servicem loggedIn is set to true
    { path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ]},
    { path: 'not-found', component: PageNotFoundComponent},
    // ** should be always last of this array. becuz parsing of top to bottom way
    { path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}