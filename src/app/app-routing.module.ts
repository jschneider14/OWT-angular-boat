import { AuthGuardService } from './service/auth-guard.service';
import { LogoutComponent } from './component/logout/logout.component';
import { LoginComponent } from './component/login/login.component';
import { BoatListComponent } from './component/boat-list/boat-list.component';
import { BoatDetailsComponent } from './component/boat-details/boat-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'boats/:id', component: BoatDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'boats', component: BoatListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
