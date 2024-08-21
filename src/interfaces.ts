import { FilterOperationEnum, ImageFormat } from "./enums";

export interface IPaginationQuery {
  sortBy?: string;
  filter?: ISearchFilterOptions[];
  search?: ISearchFilterOptions[];
}

export interface ISearchFilterOptions {
  field: string;

  operation: FilterOperationEnum;

  value: number | string | Date | number[] | string[] | boolean;
}



export interface IGetFileQuery {
 hashKey: string;
 width?: number;
 height?: number;
 quality?: number;
 format?: ImageFormat;
 fit?: string;   
}