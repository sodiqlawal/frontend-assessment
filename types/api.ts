import { AxiosError } from 'axios';

export type ApiError = AxiosError<{
  errors?: { [key: string]: string[] };
  data?: string[];
  error?: string;
  message?: string;
}>;
export interface ApiResponseBase<T> {
  success: boolean;
  message: string;
  data: T;
}
