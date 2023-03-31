import axios, { AxiosError } from "axios";
import { regex } from "../../utils/regex";

function concatWithBaseUrl(url: string, baseUrl: string) {
  if (regex.url.test(url)) return url;
  const newBaseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;
  const newUrl = url.startsWith("/") ? url : `/${url}`;
  return newBaseUrl + newUrl;
}

export type HttpFetchOptions = {
  headers?: {
    "Content-Type"?: string;
    "Access-Control-Allow-Origin"?: string;
  };
};
type Response<U> = {
  additional_data?: any;
  data: U;
  request_success: boolean;
  status_code: number;
};

export const httpFetch = (baseUrl: string = "") => ({
  post: async <T, U = Response<T>>(
    url: string,
    data: any,
    options?: HttpFetchOptions
  ): Promise<U extends false ? T : U> => {
    return axios
      .post(concatWithBaseUrl(url, baseUrl), data, options)
      .then(({ data }) => data.response);
  },
  put: async <T, U = Response<T>>(
    url: string,
    data: any,
    options?: HttpFetchOptions
  ): Promise<U extends false ? T : U> => {
    return axios
      .put(concatWithBaseUrl(url, baseUrl), data, options)
      .then(({ data }) => data.response);
  },

  delete: async <T, U = Response<T>>(
    url: string,
    options?: HttpFetchOptions
  ): Promise<U extends false ? T : U> => {
    return axios.delete(concatWithBaseUrl(url, baseUrl), options).then(({ data }) => data.response);
  },

  catchResolver: <T = Response<string[]>>(error: AxiosError<T>) => error.response?.data,
  get: async <T, U = Response<T>>(
    url: string,
    options?: HttpFetchOptions
  ): Promise<U extends false ? T : U> => {
    return axios.get(concatWithBaseUrl(url, baseUrl), options).then(({ data }) => data.response);
  },
});
