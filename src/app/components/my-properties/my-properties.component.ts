import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/shared/services/property.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-properties',
  imports: [CommonModule],
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
    // this.userForm.patchValue({
    //   address: this.UserService.user().address,
    //   email: this.UserService.user().email,
    // });

    // if (this.propertyForm) {
    //   this.propertyForm.patchValue({
    //     userId: this.UserService.user().id,
    //   });
    // }

    // // Get all user's properties
    console.log('here')
    this.service.getAllMyProperties(this.UserService.user().id).subscribe({
      next: (response) => {
        this.properties = response;
      },

      error: (err) => console.error(`Error fetching users: ${err}`),
      //complete: () => console.log('Data Fetch completed...')
    });
  }
}
