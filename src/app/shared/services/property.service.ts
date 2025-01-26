import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Property } from '../interfaces/property';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthHeaders from '../helpers/authHeaders';

const API_URL = `${environment.apiURL}/properties`;

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  addProperty(property: Property) {
    const headers = AuthHeaders.createAuthorizationHeader();
    return this.http.post(`${API_URL}`, property, { headers });
  }

  updateProperty(property: Property) {
    const headers = AuthHeaders.createAuthorizationHeader();
    return this.http.put(`${API_URL}/${property.id}`, property, { headers });
  }

  deleteProperty(id: number) {
    const headers = AuthHeaders.createAuthorizationHeader();
    return this.http.delete(`${API_URL}/${id}`, { headers });
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

    return this.http.get<Property[]>(`${API_URL}?${queryParams.toString()}`, {
      headers,
    });
  }

  // Κλήση για λήψη ενός property με Basic Auth
  getProperty(propertyId: number): Observable<any> {
    const headers = AuthHeaders.createAuthorizationHeader();
    const url = `${API_URL}/${propertyId}`;
    return this.http.get(url, { headers });
  }

  // Κλήση για λήψη όλων των properties του χρήστη με Basic Auth
  getAllMyProperties(userId: any): Observable<any> {
    const headers = AuthHeaders.createAuthorizationHeader();
    const url = `${API_URL}?userId=${userId}`;
    return this.http.get(url, { headers });
  }

  // Κλήση για λήψη όλων των properties με Basic Auth
  getAllProperties(): Observable<any> {
    const headers = AuthHeaders.createAuthorizationHeader();
    const url = `${API_URL}`;
    return this.http.get(url, { headers });
  }
}
