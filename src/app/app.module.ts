import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';

import { FileUploadComponent } from './file-upload/file-upload.component';

import { DesertTxRoutingModule} from './desert-tx-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthComponent } from './authentication/auth/auth.component';

import { getLocalStorage } from './factory/local-storage.factory';
import { StorageService } from './storage/storage.service';
import { AuthenticationInterceptorService } from './authentication/services/authentication-interceptor.service';
import { AuthGuardService } from './authentication/services/authentication-guard.service';
import { AuthenticationService } from './authentication/services/authentication.service';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SignupComponent } from './users/signup/signup.component';
import { UserService } from './users/services/user.service';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FileUploadComponent,
    LogoutComponent,
    SignupComponent,
    ToolbarComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DesertTxRoutingModule,
    FlexLayoutModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    },
    {
      provide: 'LOCAL_STORAGE',
      useFactory: getLocalStorage
    },
    StorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }