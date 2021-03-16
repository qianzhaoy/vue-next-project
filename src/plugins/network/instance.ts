import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { requestInterceptors, responseInterceptors, requestReject, responseReject } from './interceptors'

export function createAxiosInstance(baseURL: string, opts: AxiosRequestConfig = {}): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 4000,
    ...opts
  });

  instance.interceptors.request.use(requestInterceptors, requestReject)
  instance.interceptors.response.use(responseInterceptors, responseReject)
  return instance
}