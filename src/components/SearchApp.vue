<template>
  <v-container>
      <div>
      
      <v-flex>
          <v-card class="mb-4">
              <v-card-title><h2>Search for the house of your dreams</h2></v-card-title>
              <v-card-text>
                  <label style="text-align:left"><h3>What city are you looking in?</h3></label>
                  <vuetify-google-autocomplete
                    id="map"
                    placeholder="Location"
                    types="(cities)"
                    >
                    </vuetify-google-autocomplete>
                  <v-expansion-panels elevation-0 expand focusable>
                     <v-expansion-panel expand focusable>
                         <v-expansion-panel-header>See more advanced options (optional)</v-expansion-panel-header>
                         <v-expansion-panel-content>
                             <div slot="header">Item</div>
                             <label style="text-align:left">How many bedrooms?</label>
                  <v-text-field
                      name="name"
                      label="Bedrooms (Optional)"
                      id="id"
                  ></v-text-field>
                  <label style="text-align:left">Enter the city</label>
                  <v-text-field
                      name="cityName"
                      label="label"
                      id="id"
                  ></v-text-field>
                  <label style="text-align:left">Enter the city</label>
                  <v-text-field
                      name="name"
                      label="label"
                      id="id"
                  ></v-text-field>
                         </v-expansion-panel-content>
                         
                     </v-expansion-panel>
                  </v-expansion-panels>
                  
              </v-card-text>
              <v-card-actions class="mb-2">
                  <v-spacer/>
                  <v-btn color="success">
                      Search for house
                  </v-btn>
                  <v-spacer/>
              </v-card-actions>
          </v-card>
      </v-flex>
      </div>
      <div>
          <v-flex>
              
          </v-flex>
      </div>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
        value:0
    }}

}
</script>

<style>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>