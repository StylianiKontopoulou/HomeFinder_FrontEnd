import { EnergyClass } from '../enums/energyClass';
import { PropertyCondition } from '../enums/propertyCondition';
import { PropertyType } from '../enums/propertyType';
import { Area } from './area';

export interface Property {
  title: string;
  description: string;
  yearOfConstruction: number;
  price: number;
  squareMeters: number;
  floor: number;
  bathrooms: number;
  bedrooms: number;
  condition: PropertyCondition;
  energyClass: EnergyClass;
  propertyType: PropertyType;
  area: Area;
}
