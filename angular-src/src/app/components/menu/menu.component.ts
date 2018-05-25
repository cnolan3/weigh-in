import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { FlashService } from '../../services/flashService/flash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService,
              private flashService: FlashService,
              private router: Router) { }

  ngOnInit() {
  }

  loggedIn() {
    let logged = this.authService.loggedIn();
    this.user = this.authService.localUserData();
    return logged;
  }

  logout() {
    this.flashService.show('Logged Out', 'info', 3000);
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
