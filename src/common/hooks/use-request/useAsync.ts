import { Options } from "./types"
import { reactive, ref, onUnmounted, watch } from 'vue'

function noop() {}

export function useAsync(services: (...args: any[]) => Promise<any>, options = {} as Options) {
  const {
    manual = false,
    defaultLoading = true,
    definitialData = null,
    defaultParams,
    formatResult,
    onSuccess = noop,
    onError = noop,
    pollingInterval,
    refreshDeps,
    cacheKey
  } = options

  const loading = ref(defaultLoading || false)
  const data = ref(definitialData as any)
  const errorRef = ref(null as any)

  let unmountedFlag = false
  let pollingTimer: any = null
  let count = 0

  function setError(error: Error) {
    errorRef.value = error
    loading.value = false
    data.value = null
  }

  function updateData(serverData) {
    data.value = serverData
    loading.value = false
    errorRef.value = null
  }

  function unmount() {
    unmountedFlag = true
    cancel()
  }

  function run(...args) {
    if (pollingTimer) {
      clearTimeout(pollingTimer);
    }

    count += 1
    // 存储当次请求的 count. 多次请求会废除上次请求的结果
    const currentCount = count;

    services(...args).then(res => {
      if (!unmountedFlag && currentCount === count) {
        const formatterResult = formatResult ? formatResult(res) : res
        updateData(formatterResult)
        onSuccess(formatterResult)
      }
    }).catch(error => {
      if (!unmountedFlag && currentCount === count) {
        setError(error)
        onError(error)
      }
    }).finally(function() {
      if (!unmountedFlag && currentCount === count) {
        if (pollingInterval) {
          pollingTimer = setTimeout(() => {
            run(...args)
          }, pollingInterval);
        }
      }
    })
  }

  function cancel() {
    if (pollingTimer) {
      clearTimeout(pollingTimer);
    }
    // 通过修改 count. 能够让 pending 中的 request. 不执行 callback
    count += 1
  }

  if (!manual) {
    run(defaultParams || undefined)
  }

  if (refreshDeps) {
    watch(() => refreshDeps, function(newDeps) {
      run(newDeps)
    })
  }

  onUnmounted(unmount)

  return {
    run,
    cancel,
    data,
    loading,
    error: errorRef
  }
}