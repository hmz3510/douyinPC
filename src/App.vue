<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import myH5 from '@/components/h5/h5.vue'
export default {
  name: 'App',
  // components: { myH5 },
  data() {
    return {
      isPc: undefined
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style scoped="scoped">
</style>
