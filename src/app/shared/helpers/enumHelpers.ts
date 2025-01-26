import { EnergyClass } from '../enums/energyClass';
import { PropertyCondition } from '../enums/propertyCondition';
import { PropertyType } from '../enums/propertyType';
import { PropertyUse } from '../enums/propertyUse';

export default class EnumHelpers {
  static getLabelForPropertyType(type: PropertyType): string {
    const labels = {
      [PropertyType.APARTMENT]: 'Apartment',
      [PropertyType.MAISONETTE]: 'Maisonette',
      [PropertyType.DETACHED_HOUSE]: 'Detached house',
      [PropertyType.BUILDING]: 'Building',
      [PropertyType.PENTHOUSE]: 'Penthouse',
      [PropertyType.FULL_FLOOR_APARTMENT]: 'Full floor apartment',
    };
    return labels[type];
  }

  static getLabelForPropertyCondition(type: PropertyCondition): string {
    const labels = {
      [PropertyCondition.NEWLY_BUILT]: 'Newly built',
      [PropertyCondition.UNDER_CONSTRUCTION]: 'Under construction',
      [PropertyCondition.RENOVATED]: 'Renovated',
      [PropertyCondition.NEEDS_RENOVATION]: 'Needs renovation',
    };
    return labels[type];
  }

  static getLabelForEnergyClass(type: EnergyClass): string {
    const labels = {
      [EnergyClass.A_PLUS]: 'A+',
      [EnergyClass.A]: 'A',
      [EnergyClass.B_PLUS]: 'B+',
      [EnergyClass.B]: 'B',
      [EnergyClass.C]: 'C',
      [EnergyClass.D]: 'D',
      [EnergyClass.E]: 'E',
      [EnergyClass.Z]: 'Z',
      [EnergyClass.H]: 'H',
    };
    return labels[type];
  }

  static getLabelForPropertyUse(type: PropertyUse): string {
    const labels = {
      [PropertyUse.SALE]: 'Sale',
      [PropertyUse.RENT]: 'Rent',
    };
    return labels[type];
  }
}
