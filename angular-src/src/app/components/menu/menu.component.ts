import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loggedIn() {
    let logged = this.authService.loggedIn();
    this.user = this.authService.localUserData();
    return logged;
  }

  logout() {
    this.authService.logOut();
  }
}
