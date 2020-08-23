import { AuthenticationService } from './service/authentication.service';
import { AuthGuardService } from './service/auth-guard.service';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-http-interceptor.service';
import { BoatTypeService } from './service/boat-type.service';
import { BoatService } from './service/boat.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatListComponent } from './component/boat-list/boat-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoatDetailsComponent } from './component/boat-details/boat-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './component/shared/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './component/shared/error-dialog/error-dialog.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BoatListComponent,
    BoatDetailsComponent,
    ConfirmDialogComponent,
    ErrorDialogComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    BoatService,
    BoatTypeService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true}],
  entryComponents: [ConfirmDialogComponent, ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
