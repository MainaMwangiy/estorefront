
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
