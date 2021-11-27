import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input('isDarkTheme') _isDarkTheme: boolean = false;
  @Output('themeSelect') _themeEmitter = new EventEmitter<void>();

  constructor(private sessionService: SessionService, private router: Router) {}

  get isDarkTheme(): boolean{
    return this._isDarkTheme;
  }

  onThemeChange() {
    this._themeEmitter.emit();
  }

  onLogout() {
    this.sessionService.clearSession();
    this.router.navigate(['login']);
  }
}
