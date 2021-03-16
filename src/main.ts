import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { pluginInstall } from "./plugins";
import useRequest from './common/hooks/use-request'
import { network } from './plugins/network'

const app = createApp(App)

  app.use(pluginInstall)
  .use(store)
  .use(router)
  .use(useRequest, {
    network: network
  })
  .mount("#app");

  console.log(app)