import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EnergyClass } from 'src/app/shared/enums/energyClass';
import { PropertyCondition } from 'src/app/shared/enums/propertyCondition';
import { PropertyType } from 'src/app/shared/enums/propertyType';
import EnumHelpers from 'src/app/shared/helpers/enumHelpers';
import { Area } from 'src/app/shared/interfaces/area';
import { PropertyFilter } from 'src/app/shared/interfaces/property-filter';
import { AreaService } from 'src/app/shared/services/area.service';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-property-filter',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatExpansionModule
  ],
  templateUrl: './property-filter.component.html',
  styleUrl: './property-filter.component.css',
})
export class PropertyFilterComponent implements OnInit {
  areaService = inject(AreaService);
  @Output() filtersChanged = new EventEmitter<PropertyFilter>();

  filters: PropertyFilter = {};

  propertyConditions: { value: PropertyCondition; label: string }[];
  energyClasses: { value: EnergyClass; label: string }[];
  propertyTypes: { value: PropertyType; label: string }[];
  areas: Area[];

  applyFilters() {
    this.filtersChanged.emit(this.filters);
  }

  resetFilters() {
    this.filters = {};
    this.filtersChanged.emit(this.filters);
  }

  ngOnInit(): void {
    this.propertyConditions = Object.keys(PropertyCondition).map((key) => ({
      value: PropertyCondition[key as keyof typeof PropertyCondition],
      label: EnumHelpers.getLabelForPropertyCondition(
        PropertyCondition[key as keyof typeof PropertyCondition],
      ),
    }));

    this.energyClasses = Object.keys(EnergyClass).map((key) => ({
      value: EnergyClass[key as keyof typeof EnergyClass],
      label: EnumHelpers.getLabelForEnergyClass(
        EnergyClass[key as keyof typeof EnergyClass],
      ),
    }));

    this.propertyTypes = Object.keys(PropertyType).map((key) => ({
      value: PropertyType[key as keyof typeof PropertyType],
      label: EnumHelpers.getLabelForPropertyType(
        PropertyType[key as keyof typeof PropertyType],
      ),
    }));

    this.areaService.getAllAreas().subscribe({
      next: (response) => {
        this.areas = response;
      },
      error: (response) => {
        const message = response.error.msg;
        console.log('Error adding property', message);
      },
    });
  }
}
