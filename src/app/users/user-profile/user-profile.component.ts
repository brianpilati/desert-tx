import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userProfileForm: FormGroup;
  public user: UserModel;

  constructor(
    private userService: UserService,
    private formatBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.get().subscribe((user) => {
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
      displayName: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  resetForm(): void {
    this.setUserValues();
  }

  update(): void {
    if (this.userProfileForm.valid) {
      this.userService.update(<UserModel>this.userProfileForm.value).subscribe();
    }
  }
}
