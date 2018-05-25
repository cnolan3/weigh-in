import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { FlashService } from '../../services/flashService/flash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
              private flashService: FlashService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitBtn() {
    let newUser = {
      username: this.username,
      password: this.password
    }

    this.authService.authUser(newUser).subscribe((data: any) => {
      if(data.success) {
        this.flashService.show('Logged In Successfully', 'success', 3000);
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/']);
      }
    }, err => {
      if(err) {
        if(err.error == 'UserNotFound') {
          this.flashService.show('Username Does Not Exist', 'warning', 4000);
        }
        else if(err.error == 'IncompleteUserObject') {
          this.flashService.show('Please Fill In All Fields', 'warning', 4000);
        }
        else if(err.error == 'WrongPassword') {
          this.flashService.show('Incorrect Password', 'warning', 4000);
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
