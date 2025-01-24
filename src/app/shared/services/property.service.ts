import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Property } from '../interfaces/property';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthHeaders from '../helpers/authHeaders';

const API_URL = `${environment.apiURL}/properties`;

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  addProperty(property: Property) {
    const headers = AuthHeaders.createAuthorizationHeader();
    return this.http.post(`${API_URL}`, property, {headers});
  }

  searchProperty(filters: Partial<Property>) {
    const headers = AuthHeaders.createAuthorizationHeader();
    const queryParams = new URLSearchParams();
  
    // Προσθήκη φίλτρων ως query parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (!!value) {
        queryParams.append(key, value.toString());
      }
    });
  
    return this.http.get<Property[]>(`${API_URL}?${queryParams.toString()}`, { headers });
  }

    // Κλήση για λήψη όλων των properties με Basic Auth
    getAllMyProperties(userId: any): Observable<any> {
      const headers = AuthHeaders.createAuthorizationHeader();
      const url = `${environment.apiURL}/properties?userId=${userId}`;
      return this.http.get(url, { headers });
    }
}
