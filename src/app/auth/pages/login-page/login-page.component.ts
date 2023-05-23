import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: []
})
export class LoginPageComponent {

  constructor(
     private authService: AuthService,
    private router: Router, ) {

  }


  onClick():void {

    this.authService.login('martinenriquez@gmail.com', '123456')
    .subscribe(user => {
      this.router.navigate(['/'])

    })

  }

}
