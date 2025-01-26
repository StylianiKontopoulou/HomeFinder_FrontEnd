import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import EnumHelpers from 'src/app/shared/helpers/enumHelpers';
import { Property } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-property-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css',
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: Property;
  userService = inject(UserService);
  userOwned: boolean = false;

  ngOnInit(): void {
    let currentUser = this.userService.user();
    if (currentUser !== null) {
      this.userOwned = this.userService.user().id == this.property.user.id;
    }
  }

  getPricePerSquareMeter(): string {
    return this.property.squareMeters === 0
      ? '0'
      : (this.property.price / this.property.squareMeters).toFixed(2);
  }
  getPropertyTypeLabel(): string {
    return EnumHelpers.getLabelForPropertyType(this.property.propertyType);
  }

  getEnergyClassLabel(): string {
    return EnumHelpers.getLabelForEnergyClass(this.property.energyClass);
  }

  getPropertyConditionLabel(): string {
    return EnumHelpers.getLabelForPropertyCondition(this.property.condition);
  }
}
