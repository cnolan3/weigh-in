import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { FlashService } from '../../services/flashService/flash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstname: String;
  lastname: String;
  username: String;
  email: String;
  password: String;
  passConf: String;

  constructor(private authService: AuthService,
              private flashService: FlashService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitBtn() {
    if(this.password != this.passConf) {
      this.flashService.show('Passwords Do Not Match', 'warning', 4000);
      return;
    }

    let newUser = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    }

    this.authService.registerUser(newUser).subscribe((data: any) => {
      if(data.success) {
        this.flashService.show('Successfully Registered', 'success', 3000);
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/']);
      }
    }, err => {
      if(err) {
        if(err.error == 'UsernameTooShort') {
          this.flashService.show('Username Too Short, Must Be Between 6 And 14 Characters Long', 'warning', 4000);
        }
        else if(err.error == 'UsernameTooLong') {
          this.flashService.show('Username Too Long, Must Be Between 6 And 14 Characters Long', 'warning', 4000);
        }
        else if(err.error == 'PasswordTooShort') {
          this.flashService.show('Password Too Short, Must Be At Least 6 Characters', 'warning', 4000);
        }
        else if(err.error == 'InvalidEmail') {
          this.flashService.show('Invalid Email', 'warning', 4000);
        }
        else if(err.error == 'IncompleteUserObject') {
          this.flashService.show('Please Fill In All Fields', 'warning', 4000);
        }
        else if(err.error == 'UserAlreadyExists') {
          this.flashService.show('Username Already Exists', 'warning', 4000);
        }
        else if(err.error == 'Error') {
          this.flashService.show('Server Error', 'warning', 4000);
        }
        else {
          this.flashService.show('Unknown Error', 'warning', 4000);
        }
      }
    });
  }
}
