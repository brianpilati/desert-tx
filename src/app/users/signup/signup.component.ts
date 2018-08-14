import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationModel } from '../../models/authentication.model';
import { RegistrationValidator } from '../../libs/registration-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public registrationForm: FormGroup;
  public passwordFormGroup: FormGroup;

  constructor(
    private userService: UserService,
    private formatBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.passwordFormGroup = this.formatBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });

    this.registrationForm = this.formatBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      passwordFormGroup: this.passwordFormGroup
    });

  }

  resetForm(): void {
    this.registrationForm.reset();
  }

  register(): void {
    if (this.registrationForm.valid) {
      const authenticationModel = <AuthenticationModel> {
        email: this.registrationForm.get('email').value,
        password: this.passwordFormGroup.get('password').value,
      }
      this.userService.register(authenticationModel).subscribe(() => this.router.navigate(['file-upload']));
    }
  }
}

