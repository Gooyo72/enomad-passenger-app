export interface SearchRequest {
  domain?: any[];
  fields?: string[];
  order?: string;
  limit?: number;
  offset?: number;
  count?: boolean;
  maxLimit?: number;
}

export interface SearchResponse<T> {
  total: number | null;
  page: number;
  page_size: number;
  offset: number;
  limit: number;
  total_pages: number | null;
  records: T[];
}
