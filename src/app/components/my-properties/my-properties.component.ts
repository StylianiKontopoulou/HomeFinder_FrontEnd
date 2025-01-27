import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/shared/services/property.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-my-properties',
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    PropertyCardComponent,
  ],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css',
})
export class MyPropertiesComponent implements OnInit {
  service = inject(PropertyService);
  UserService = inject(UserService);
  currentUser: any = {};
  users: any;
  properties: any;
  answer: any;
  userForm!: FormGroup;
  propertyForm!: FormGroup;

  router = inject(Router);
  response: any;
  firstName: string | null = null;
  lastName: string | null = null;
  userId: string | null = null;
  route = inject(ActivatedRoute);
  propertyId: number = 0;
  selectedPropertyId: number | null = null;
  ngOnInit(): void {
    // // Get all user's properties
    this.service.getAllMyProperties(this.UserService.user().id).subscribe({
      next: (response) => {
        this.properties = response;
      },

      error: (err) => console.error(`Error fetching users: ${err}`),
    });
  }
}
