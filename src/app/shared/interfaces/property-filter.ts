import { PropertyCondition } from "../enums/propertyCondition";
import { PropertyType } from "../enums/propertyType";
import { PropertyUse } from "../enums/propertyUse";
import { Area } from "./area";

export interface PropertyFilter {
    minPrice?: number;
    maxPrice?: number;
    propertyUses?: PropertyUse[];
    conditions?: PropertyCondition[];
    propertyTypes?: PropertyType[];
    areas?: Area[];
    minSquareMeters?: number;
    maxSquareMeters?: number;
  }