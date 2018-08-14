import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../../models/user.model';
import { RegistrationValidator } from '../../libs/registration-validator';
import { UserPasswordModel } from '../../models/user-password.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userProfileForm: FormGroup;
  public userPasswordForm: FormGroup;
  public user: UserModel;
  public isLoading = true;

  constructor(
    private userService: UserService,
    private formatBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.get().subscribe((user) => {
      this.isLoading = false;
      this.user = user 
      this.setUserValues();
    });
  }

  private setUserValues(): void {
    this.userProfileForm.setValue(Object.assign(this.userProfileForm.value, this.user));
  }

  createForm() {
    this.userProfileForm = this.formatBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      displayName: ['', [Validators.required, Validators.maxLength(255)]],
      photoUrl: ['', [Validators.maxLength(255), Validators.email]]
    });

    this.userPasswordForm = this.formatBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
  }

  resetForm(): void {
    this.setUserValues();
  }

  updateUser(): void {
    if (this.userProfileForm.valid) {
      this.userService.update(<UserModel>this.userProfileForm.value).subscribe();
    }
  }

  resetPasswordForm(): void {
    this.userPasswordForm.reset();
  }

  updatePassword(): void {
    if (this.userPasswordForm.valid) {
      this.userService.updatePassword(
        <UserPasswordModel>
        this.userPasswordForm.value
      ).subscribe(() => this.resetPasswordForm());
    }
  }
}
