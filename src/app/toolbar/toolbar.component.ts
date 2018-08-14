import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isAuthenticated = true;
  photoUrl = '';

  constructor(
    authenticationService: AuthenticationService,
    userService: UserService,
    private storageService: StorageService
  ) { 
    authenticationService.getAuthenticatedSubject().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })
    this.photoUrl = this.storageService.getUserPhotoUrl();

    userService.getUserProfileUpdatedSubject().subscribe((isUpdated) => {
      console.log(isUpdated);
      if (isUpdated) {
        this.photoUrl = this.storageService.getUserPhotoUrl();
      }
    });
  }

  ngOnInit() { 
  }
}
