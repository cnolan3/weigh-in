import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
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
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitBtn() {
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
    });
  }
}
