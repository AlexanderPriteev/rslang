export interface CustomChart {
  title: string;
  width: number;
  color?: string;
  value: number;
  type: string;
}

export interface statisticsTab{
  tabTitle: string;
  tabContent: HTMLElement;
}