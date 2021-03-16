import { handleError } from "@/common/utils/handleError";
import { AxiosRequestConfig } from "axios";

export function requestInterceptors(config: AxiosRequestConfig) {
  return config
}

export function requestReject(error) {
  handleError(error)
  return Promise.reject(error)
}

export function responseInterceptors(response) {
  if (response.statusText === 'OK' && response.status >= 200 && response.status <= 300 ) {
    return response.data
  } else {
    return Promise.reject(response.data)
  }
}

export const responseReject = requestReject