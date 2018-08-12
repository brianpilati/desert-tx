import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationModel } from '../../models/authentication.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public authForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formatBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.authForm = this.formatBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    });
  }

  resetForm(): void {
    this.authForm.reset();
  }

  authenticate(): void {
    if (this.authForm.valid) {
      this.authenticationService.authenticate(<AuthenticationModel>this.authForm.value).subscribe(() => this.router.navigate(['file-upload'])
    );
    }
  }
}
