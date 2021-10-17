import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private sessionService: SessionService, private router: Router) {}

  onLogout() {
    this.sessionService.clearSession();
    this.router.navigate(['login']);
  }
}
