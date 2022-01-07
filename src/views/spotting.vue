<template>
<div>
  <v-content>
  <SpotterApp/>
  </v-content>
</div>
</template>

<script>
import SpotterApp from "@/components/SpotterApp.vue"
export default {
  components: {
    SpotterApp
  },
  mounted () {
  window.scrollTo(0, 0)
}
}
</script>

<style>

</style>