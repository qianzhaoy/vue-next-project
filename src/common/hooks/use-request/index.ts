import { reactive, inject } from 'vue'
import { AxiosPromise } from 'axios'
import { useAsync } from './useAsync'

const requestHookKey = 'network'

function useRequest(service: any, opts: any = {}) {
  let promiseService: () => AxiosPromise<any>

    // @ts-ignore
  const fetchProxy = (...args: any[]) =>
  // @ts-ignore
  fetch(...args).then((res: Response) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

  const network = inject(requestHookKey) as any
  const requestMethod = network || fetchProxy

  switch (typeof service) {
    case 'string':
      promiseService = () => requestMethod(service)
      break;
    case 'object':
      const { url, ...rest } = service
      promiseService = () => requestMethod(url, rest)
      break
    default: 
      promiseService = (...args: any[]) => new Promise((resolve, reject) => {
        const s = service(...args);
        let fn = s;
        if (!s.then) {
          switch (typeof s) {
            case 'string':
              fn = requestMethod(s);
              break;
            case 'object':
              const { url, ...rest } = s;
              fn = requestMethod(url, rest);
              break;
          }
        }
        fn.then(resolve).catch(reject);
      })
      break
  }
  return useAsync(promiseService, opts)
}

export function setOptions() {
  
}

useRequest.install = function(app, opts) {
  if (!opts) {
    return false
  }
  const {
    networkKey,
    network
  } = opts
  app.provide(networkKey || requestHookKey, network)
}

export default useRequest