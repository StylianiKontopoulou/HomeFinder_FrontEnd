import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthHeaders from '../helpers/authHeaders';

const API_URL = `${environment.apiURL}/areas`;

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  // Retrieve list of available areas
  getAllAreas(): Observable<any> {
    const headers = AuthHeaders.createAuthorizationHeader();
    const url = `${API_URL}`;
    return this.http.get(url, { headers });
  }
}
