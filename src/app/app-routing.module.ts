import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { canDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent}
    ]},
    { 
        path: 'servers', 
        //canActivate: [AuthGaurd],
        canActivateChild: [AuthGuard], 
        component: ServersComponent, 
        children: [
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [canDeactivateGuard]}
    ]},
    //{ path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'}},
    { path: '**', redirectTo: '/not-found'} //**  should be kept in the last warna kaam nhi krgea
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{
    
}