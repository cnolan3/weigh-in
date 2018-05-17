import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
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
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/']);
      }
    });
  }

}
