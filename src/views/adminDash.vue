<template>
  <v-container class="mt-4">
    <v-row align="center" justify="center">
    <v-col  cols="12" md="6">
    <v-app-bar style="border-radius:8px">
      <v-toolbar-title style="font-weight:600 ; font-size:28px">Welcome to Administrator Dashboard</v-toolbar-title>
    </v-app-bar>
    <v-row class="mt-1">
      <v-col>
        <v-card>
          <v-card-actions>
            <v-btn> Press me </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-1">
      <v-col>
        <v-card>
          <v-card-title primary-title>
            <h6>Dashboard information</h6>
          </v-card-title>
          <v-card-text>
            <p>
              Here you will be able to link a registered agent to a spotted house, add a new
              company and view spotted properties
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs center-active v-model="tab" fixed-tabs background-color="blue" dark>
            <v-tab style="color:black"> Add a real estate agent </v-tab>
            <v-tab style="color:black"> Spotted properties </v-tab>
            <v-tab style="color:black"> Add an Agency </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <!-- Add estate agent -->
            <v-tab-item>
              <template>
                <v-row>
                  <v-col>
                    <v-card-text v-if="success" style="color: green">
                      Success
                    </v-card-text>
                    <v-card-text>
                      <v-form v-model="agentValid" ref="form" lazy-validation>
                        <v-text-field
                          label="Name"
                          v-model="agentName"
                          :counter="10"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="E-mail"
                          v-model="agentEmail"
                          required
                        ></v-text-field>
                        <vuetify-google-autocomplete
                          id="map"
                          placeholder="City"
                          types="(cities)"
                          v-model="agentCity"
                          v-on:placechanged="getAddressData"
                        >
                        </vuetify-google-autocomplete>
                        <v-select
                          label="Agency"
                          v-model="agency"
                          :items="this.agencies"
                          :rules="[(v) => !!v || 'Agency is required']"
                          required
                          item-text="agency"
                        ></v-select>
                        <v-checkbox
                          label="Is the above information correct?"
                          v-model="checkbox"
                          :rules="[(v) => !!v || 'You must agree to continue!']"
                          required
                        ></v-checkbox>

                        <v-btn @click="storeAgent" :disabled="!agentValid">
                          submit
                        </v-btn>
                        <!-- <v-btn @click="clear">clear</v-btn> -->
                      </v-form>
                    </v-card-text>
                  </v-col>
                </v-row>
              </template>
            </v-tab-item>
            <v-tab-item>
              <spotterProps />
            </v-tab-item>
            <v-tab-item>
              <v-card-text v-if="successAgency" style="color: green">
                Success
              </v-card-text>
              <v-card-text>
                <template>
                  <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                      label="Agency Name"
                      v-model="agencyName"
                      :counter="10"
                      required
                    ></v-text-field>
                    <vuetify-google-autocomplete
                      id="map"
                      placeholder="City"
                      types="(cities)"
                      v-model="agencyCity2"
                      v-on:placechanged="getAddressData"
                    >
                    </vuetify-google-autocomplete>
                    <v-checkbox
                      label="Is the information correct?"
                      v-model="checkbox"
                      :rules="[(v) => !!v || 'You must agree to continue!']"
                      required
                    ></v-checkbox>

                    <v-btn @click="storeAgency" :disabled="!checkbox">
                      submit
                    </v-btn>
                    <!-- <v-btn @click="clear">clear</v-btn> -->
                  </v-form>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import spotterProps from "../components/admin/spotterProps.vue";
import { agentCollection, agenciesCollection, auth } from "@/firebase";
import { usersCollection } from "../firebase";

export default {
  components: { spotterProps },
  data() {
    return {
      assignDialog: false,
      valid: false,
      agency: null,
      agentValid: false,
      agencies: [],
      success: false,
      successAgency: false,
      agentName: "",
      agencyCity2: "",
      agentAgency: "",
      agentEmail: "",
      agentCity: "",
      agencyName: "",
      agencyCity: "",
      tab: 0,
      spottedHouses: [],
      agencyName: "",
      checkbox: false,
      address: [],
      id: null,
      placeResultData: null,
    };
  },
  created() {
    this.getAgencies();
    console.log(this.agencies);
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      this.placeResultData = placeResultData;
      this.id = id;
      this.agencyCity = this.address.locality;
      console.log(this.address);
    },
    async storeAgent() {
      try {
        this.isLoading = true;

        // // upload file
        // const fileRef = 'uploads/spots/' + this.file.name
        // const snapshot = await storage.ref(fileRef).put(this.file)

        let data = {
          agency: this.agency,
          name: this.agentName,
          email: this.agentEmail,
          city: this.agentCity,
        };
        const doc = agentCollection.add(data);

        this.isLoading = false;
        this.success = true;
      } catch (e) {
        console.log(e);
      }
    },

    async storeAgency() {
      try {
        this.isLoading = true;

        // // upload file
        // const fileRef = 'uploads/spots/' + this.file.name
        // const snapshot = await storage.ref(fileRef).put(this.file)

        let data = {
          city: this.agencyCity2,
          name: this.agencyName,
        };
        const doc = agenciesCollection.add(data);

        this.isLoading = false;
        this.successAgency = true;
      } catch (e) {
        console.log(e);
      }
    },
    async getAgencies() {
      try {
        const querySnapshot = await agenciesCollection.get();
        querySnapshot.forEach(async (doc) => {
          this.agencies.push({
            agency: doc.data().name + " | " + doc.data().city,
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>


<style>
</style>