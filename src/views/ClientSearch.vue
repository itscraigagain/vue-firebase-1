<template>
<div>
  <Searchapp/>
  <div v-if="searchHouses">
    <v-data-table
      headers="headers"
      items="items"
      hide-actions
      class="elevation-1"
      select-all
      pagination.sync="pagination"
      item-key="id"
      loading="true"
      search="search"
    >
      
    </v-data-table>
  </div>
</div>
</template>

<script>
import Searchapp from '@/components/SearchApp.vue'
export default {
  components: {
    Searchapp
  },
  data() {
    return {
    searchHouses:false
  }},
  mounted () {
  window.scrollTo(0, 0)
}
  
}

</script>

<style>

</style>