import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs";
import { LoginForm } from "src/app/models/models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl = 'https://localhost:44332/api/auth/';

  private _headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  login(credentials: LoginForm): Observable<any>{
    return this.http.post(this._apiUrl + "login", credentials, this._headers);
  }

}