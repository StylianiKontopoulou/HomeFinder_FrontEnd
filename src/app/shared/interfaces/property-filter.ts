import { PropertyCondition } from "../enums/propertyCondition";
import { PropertyType } from "../enums/propertyType";
import { Area } from "./area";

export interface PropertyFilter {
    minPrice?: number;
    maxPrice?: number;
    condition?: PropertyCondition;
    propertyType?: PropertyType;
    area?: Area;
    minSquareMeters?: number;
    maxSquareMeters?: number;
  }