import { App } from 'vue'
import elementInstall from './element'
import networkInstall from './network'

export function pluginInstall(app: App) {
  elementInstall(app)
  networkInstall(app)
}