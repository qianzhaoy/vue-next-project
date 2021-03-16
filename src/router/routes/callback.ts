import { h } from 'vue'
const callbackRoute = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: {
      render() {
        return h('div', null, ['404'])
      }
    }
  }
]
export default callbackRoute