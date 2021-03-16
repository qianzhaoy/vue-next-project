import { RouteRecordRaw } from "vue-router";

const routesByRequire = require.context('./', true, /\.ts$/);

const routes = routesByRequire.keys().reduce((result: RouteRecordRaw[], path: string) => {
  const route = routesByRequire(path).default
  return route ? result.concat(route) : result
}, [])

export {
  routes
}
