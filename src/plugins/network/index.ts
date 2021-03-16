import { App } from 'vue'
import { createAxiosInstance } from './instance'
import { BASE_URL } from '@/common/constants/config'

export const network = createAxiosInstance(BASE_URL)

export default function (app: App) {
  app.config.globalProperties.$network = network
}