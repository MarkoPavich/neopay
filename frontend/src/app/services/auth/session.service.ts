import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionModel, User } from "src/app/models/models";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _session = new BehaviorSubject({
    user: null,
    token: '',
    expires: ''
  } as SessionModel)

  private _isLoading = new BehaviorSubject(false);

  get authToken(): string{
    return this._session.value['token'];
  }

  get user(): User | null{
    return this._session.value.user;
  }

  get isLoggedIn(): boolean{
    return this.user !== null;
  }

  monitorIsLoading(): Observable<boolean>{
    return this._isLoading.asObservable();
  }

  setIsLoading(isLoading: boolean){
    this._isLoading.next(isLoading);
  }

  setSession(session: SessionModel){
    this._session.next(session);
  }

  clearSession(){
    const session: SessionModel = {
      user: null,
      token: '',
      expires: ''
    }

    this._session.next(session);
  }

}