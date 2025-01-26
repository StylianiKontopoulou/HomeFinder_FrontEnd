import { PropertyCondition } from "../enums/propertyCondition";
import { PropertyType } from "../enums/propertyType";
import { Area } from "./area";

export interface PropertyFilter {
    minPrice?: number;
    maxPrice?: number;
    conditions?: PropertyCondition[];
    propertyTypes?: PropertyType[];
    areas?: Area[];
    minSquareMeters?: number;
    maxSquareMeters?: number;
  }