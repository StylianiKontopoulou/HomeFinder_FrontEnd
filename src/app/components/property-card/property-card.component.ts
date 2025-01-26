import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import EnumHelpers from 'src/app/shared/helpers/enumHelpers';
import { Property } from 'src/app/shared/interfaces/property';

@Component({
  selector: 'app-property-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css',
})
export class PropertyCardComponent {
  @Input() property!: Property;
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
