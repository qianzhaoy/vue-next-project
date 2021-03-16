export type Options = {
  manual?: boolean
  defaultLoading?: boolean
  definitialData?: any,
  onSuccess?: Function
  onError?: Function
  formatResult?: Function
  pollingInterval?: number
  refreshDeps?: any
  defaultParams?: any
  cacheKey?: string
}