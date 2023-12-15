export interface GetListParams {
  pageNumber: number;
  pageSize: number;
}

export interface PaginateProp {
  page: number;
  size: number;
}
export interface PaginateOptions {
  table: PaginateProp;
  setTable: (value: any) => void;
  total: number;
  pageCount: number;
}
