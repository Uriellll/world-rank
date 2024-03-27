import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService:AuthService, private router: Router){

  }
  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
