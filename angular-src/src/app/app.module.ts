import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { AuthService } from './services/authService/auth.service';
import { DataService } from './services/dataService/data.service';
import { FlashService } from './services/flashService/flash.service';


import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MenuComponent } from './components/menu/menu.component';


import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { SearchpageComponent } from './components/searchpage/searchpage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DebateComponent } from './components/debate/debate.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';


import { AuthGuard } from './guards/auth.guard';
import { FlashComponent } from './components/flash/flash.component';


const appRoutes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'search',component:SearchpageComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'debate/:id',component:DebateComponent},
  {path:'post',component:PostComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}
]

export function fact() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    FooterComponent,
    SearchpageComponent,
    RegisterComponent,
    LoginComponent,
    DebateComponent,
    PostComponent,
    ProfileComponent,
    FlashComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: fact,
        whitelistedDomains: [environment.apiUrl]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    DataService,
    FlashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
