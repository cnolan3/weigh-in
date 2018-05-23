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
      this.flashService.show('Passwords Do Not Match', 4000);
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
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/']);
      }
    }, err => {
      if(err) {
        if(err.error == 'UsernameTooShort') {
          this.flashService.show('Username Too Short, Must Be Between 6 And 14 Characters Long', 4000);
        }
        else if(err.error == 'UsernameTooLong') {
          this.flashService.show('Username Too Long, Must Be Between 6 And 14 Characters Long', 4000);
        }
        else if(err.error == 'PasswordTooShort') {
          this.flashService.show('Password Too Short, Must Be At Least 6 Characters', 4000);
        }
        else if(err.error == 'InvalidEmail') {
          this.flashService.show('Invalid Email', 4000);
        }
        else if(err.error == 'IncompleteUserObject') {
          this.flashService.show('Please Fill In All Fields', 4000);
        }
        else if(err.error == 'UserAlreadyExists') {
          this.flashService.show('Username Already Exists', 4000);
        }
        else if(err.error == 'Error') {
          this.flashService.show('Server Error', 4000);
        }
        else {
          this.flashService.show('Unknown Error', 4000);
        }
      }
    });
  }
}
