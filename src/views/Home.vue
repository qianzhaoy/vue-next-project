<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    {{data}}
    <div>
      loading: {{loading}}
    </div>
    <div>
      {{error}}
    </div>
    <leapx ref="leapx"></leapx>
    <button type="button" @click="setLeapX">修改</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, reactive, ref, watchEffect } from "vue";
import leapx from './xxx'
import { useRequest } from '@/common/hooks'
import { network } from '@/plugins/network'
import { sleep } from '@/common/utils/sleep'

class UserServices {
  static fetchUserInfo(updateData: any) {
    return network.post('/getUserInfo', updateData)
  }
}

export default defineComponent({
  name: "Home",
  components: {
    leapx
  },
  setup(props, context) {
    const leapx: any = ref(null)
    function setLeapX() {
      leapx.value.setObserveA(2)
    }
    const { data, loading, error } = useRequest(function() {
      return sleep(2000).then(_ => {
        // return network('/api/getuser')
        return [{a: 1},{a: 2}]
      })
    })

    watchEffect(() => {
      console.log({data})
    })

    return {
      data,
      loading,
      error,
      leapx,
      setLeapX
    }
    // useRequest(() => UserServices.fetchUserInfo(updateData))
  },
});
</script>
