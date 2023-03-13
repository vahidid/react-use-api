/* eslint-disable functional/no-class */
export type Options = {
  readonly startOnLoad: boolean;
};

export type AxiosLikeResponse<T = any> = {
  readonly data: T;
  readonly status: number;
  readonly statusText: string;
  readonly request?: any;
};

export class AxiosLikeError extends Error {
  readonly code?: string;
  readonly request?: never;
  readonly response?: AxiosLikeResponse;
  readonly status?: number;
}
