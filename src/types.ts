export interface SeriesItemType {
  variable: string;
  display_name: string;
  unit_id: string;
  display_name_en: string;
}
export interface SeriesListType {
  pageSize: number;
  page: number;
  data: Array<SeriesItemType>;
  totalPages: number;
}

export interface VisualizationItem {
  id: number;
  serie: string;
  english: boolean;
  texto: string;
  text: string;
  date_start: Date;
  date_end: Date;
  type: string;
  option1: number;
  option2: number;
  title: string;
}

export interface VisualizationItemTable {
  id: number;
  serie: string;
  english: boolean;
  texto: string;
  text: string;
  date_start: Date;
  date_end: Date;
  type: string;
  option1: number;
  option2: number;
  title: string;
  data:any;
}

export interface VisualizationItemSelect {
  valueType: String;
  Option1Value: number;
  Option2Value: number;
  selectHandler1: Function;
  selectHandler2: Function;
  english: boolean;
}

export const chartTypes = ["line", "area", "bar"];
export const chartColors = ["#503ec7", "#aa38c9", "#50ba32", "#c47831"]; //purpura  //rosa // verde //naranja
export const tableDecimals = [
  "1 decimal",
  "2 decimales",
  "3 decimales",
];
export const tableDateFormats = [
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "Do MMM YY",
  "MMMM Do YYYY",
];
