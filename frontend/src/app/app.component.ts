import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _darkThemeEnabled: boolean = false;

  get darkThemeEnabled(): boolean {
    return this._darkThemeEnabled;
  }

  ngOnInit() {
    const darkModePref = localStorage.getItem('dark-mode');
    this._darkThemeEnabled = darkModePref ? JSON.parse(darkModePref) : false;
  }

  handleThemeChange() {
    this._darkThemeEnabled = !this._darkThemeEnabled;
    localStorage.setItem('dark-mode', JSON.stringify(this._darkThemeEnabled));
  }
}
