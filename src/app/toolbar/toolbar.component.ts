import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isAuthenticated = true;

  constructor(
    authenticationService: AuthenticationService
  ) { 
    authenticationService.getAuthenticatedSubject().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  ngOnInit() { }
}
