<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){

    // axios.post('/api/registry',{username:'wsy',password:'123456'}).then(res=>{
    //   console.log(res.data);
    // })

    this.$api.user.login({username:'wsy',password:'123456'}).then(res=>{
        console.log(res.data)
    })
  }
}
</script>
