export type IResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

export type Pagination = {
  page: number;
  totalPages: number;
  totalDocs: number;
  limit: number;
};

export type Query = {
  page: number;
  limit: number;
};