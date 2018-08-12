import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthGuardService } from './authentication/services/authentication-guard.service';
import { AuthComponent } from './authentication/auth/auth.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/file-upload',
    pathMatch: 'full'
  },
  {
    path: 'file-upload',
    component: FileUploadComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'signup',
    component: SignupComponent 
  },
  {
    path: 'logout',
    component: LogoutComponent 
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class DesertTxRoutingModule {}
