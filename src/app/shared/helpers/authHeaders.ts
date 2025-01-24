import { HttpHeaders } from '@angular/common/http';

export default class AuthHeaders {
  static createAuthorizationHeader(): HttpHeaders {
    const auth = 'Basic ' + localStorage.getItem('authorizationHeader');
    return new HttpHeaders({ Authorization: auth });
  }
}
