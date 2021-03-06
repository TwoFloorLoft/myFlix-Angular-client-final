import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
      this.openUserLoginDialog(this.userData.Username);
      console.log(response);
      this.snackBar.open('user registered successfully', 'OK', { duration: 200 });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', { duration: 4000 });
    });
  }

  openUserLoginDialog(
    username: string
  ): void {
    this.dialog.open(UserLoginFormComponent, {
      data: username,
      width: '320px'
    });
  }
}