// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   credentials = { email: '', password: '' };
//   userIsAuthenticated = false;
//   private authListenerSubs: any;

//   constructor(private authService: AuthService, private router: Router) {}
//   ngOnInit() {
//     this.userIsAuthenticated = this.authService.getIsAuth();
//     this.authListenerSubs = this.authService
//       .getAuthStatusListener()
//       .subscribe((isAuthenticated) => {
//         this.userIsAuthenticated = isAuthenticated;
//         console.log(this.userIsAuthenticated);
//       });
//   }
//   login() {
//     this.authService.login(this.credentials).subscribe(
//       (response) => {
//         // Handle successful login, save token, navigate, etc.
//         console.log('Login successful', response);
//         this.router.navigate(['/dash/maincontent']);
//       },
//       (error) => {
//         // Handle login error
//         console.error('Login failed', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorLogin = false;
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Handle successful login, save token, navigate, etc.
        console.log('Login successful', response);
        this.router.navigate(['/dash/maincontent']);
      },
      (error) => {
        this.errorLogin = true;
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
}
