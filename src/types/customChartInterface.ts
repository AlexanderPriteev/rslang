export interface CustomChart {
  title: string;
  width: number;
  color?: string;
  value: number;
  type: string;
}

export interface StatisticsTab {
  tabTitle: string;
  tabContent: HTMLElement;
}
