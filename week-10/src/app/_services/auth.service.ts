import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated = false;
  private _userId = 'abc';

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() { }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  getUserId() {
    return this._userId;
  }
}