export interface Table {
  id?: number;
  name: string;
  tableNumber: number;
  checked: boolean;
}

export interface AggregatedTableDto {
  id: number;
  tableList: Table[];
}

export interface TableCount {
  totalInvites: number;
  totalArrived: number;
  toArrive: number;
}
