import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _darkThemeEnabled: boolean = false;

  get darkThemeEnabled(): boolean {
    return this._darkThemeEnabled;
  }

  handleThemeChange() {
    this._darkThemeEnabled = !this._darkThemeEnabled;
  }
}
