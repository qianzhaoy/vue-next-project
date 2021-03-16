import { defineComponent, reactive } from 'vue'

function renderIcon(name: string) {
  return <div>{name}</div>
}

export default defineComponent({
  render(proxyTouse) {
    const { observeA } = proxyTouse
    return (
      <div>
        {observeA.a}
        {renderIcon('tag')}
      </div>
    )
  },
  setup(_, { expose }) {
    const observeA = reactive({
      a: 1
    })
    function setObserveA(value: number) {
      observeA.a = value
    }
    expose({
      setObserveA
    })
    return {
      observeA
    }
  }
})