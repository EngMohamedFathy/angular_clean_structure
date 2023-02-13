import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';

//import { User } from '@data/schema/user';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env";
import {TokenStorageService} from "@core/services/token-storage.service";
import {Router} from "@angular/router";

interface LoginContextInterface {
  username: string;
  password: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  private baseUrl: string = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService,private router: Router) {}

  public login(loginPayload: LoginContextInterface): Observable<any> {
    // make login request request
    return this.http.post(`${this.baseUrl}/signin`,loginPayload)
  }

  public isLoggedIn(){
    return this.tokenStorageService.getToken() !== null;
  }

  public logout(){
    this.router.navigate(["login"]);
    this.tokenStorageService.removeToken();
  }

  public getToken(){
    return this.tokenStorageService.getToken()
  }
}
