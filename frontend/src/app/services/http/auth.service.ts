import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { LoginForm, SessionModel } from "src/app/models/models";
import { SessionService } from "./session.service";

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

  constructor(private http: HttpClient, private sessionService: SessionService){}

  login(credentials: LoginForm): void{
    this.sessionService.setIsLoading(true);

    this.http.post(this._apiUrl + "login", credentials, this._headers)
      .subscribe(response => {
        this.sessionService.setSession(response as SessionModel);
        this.sessionService.setIsLoading(false);
      }, err => {
        console.log(err);
        alert("Something went wrong");
        this.sessionService.setIsLoading(false);
      })
  }

}