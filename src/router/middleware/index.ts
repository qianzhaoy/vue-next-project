import { Router, NavigationHookAfter, NavigationGuardWithThis } from "vue-router";

const beforEachMiddleware: NavigationGuardWithThis<undefined> = function (to, from) {
  return true
}

const afterEachMiddleware: NavigationHookAfter = function (to, from, failure) {

}

export function useRouterBeforeEach(router: Router) {
  router.beforeEach(beforEachMiddleware)
}

export function useRouterAfterEach(router: Router) {
  router.afterEach(afterEachMiddleware)
}