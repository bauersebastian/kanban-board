// definition of a column
// id is optional, since a new column has no id yet
export interface Column {
  name: string;
  limit: number;
  _id?: string;
}
