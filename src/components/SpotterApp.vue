<template>
  <v-container>
    <v-flex align="center">
      <v-card max-width="640" class="mt-4">
        <v-card-title>
          <v-btn to="/dashboard" text prepend-icon="mdi-arrow-left"
            >Go Back</v-btn
          >
        </v-card-title>
        <v-card-title class="text-left">
          <h2>Spot a house for a commission</h2>
        </v-card-title>
        <v-card-text class="text-left">
          <p>
            Enter the details of the home of the person you know is trying to
            sell and you will earn a commission as soon as the house sells!
          </p>
        </v-card-text>
        <v-card-actions>
          <v-flex>
            <v-form v-model="valid" lazy-validation ref="form">
              <!-- <place-autocomplete-field width="100%" v-model="field1" placeholder="Enter an an address, zipcode, or location" label="Insert an address here to autocomplete" name="field1" api-key="AIzaSyB-tEgBJOLdRAn9iwErpHpSRGU_mfDLNIA"></place-autocomplete-field> -->
              <vuetify-google-autocomplete
                ref="address"
                id="map"
                :rules="fieldRules"
                append-icon="mdi-search"
                placeholder="Start typing"
                v-on:placechanged="getAddressData"
                street_number="street_number"
                contry="ZA"
              >
              </vuetify-google-autocomplete>

              <p>
                <b class="card-title text-left"
                  >Enter an address above and watch the fields below get
                  auto-filled...</b
                >
              </p>

              <p>
                <v-text-field
                  name="street"
                  label="Street Number"
                  disabled
                  v-model="address.street_number"
                  class="form-control"
                >
                </v-text-field>
              </p>
              <p>
                <v-text-field
                  name="addr2"
                  label="Street"
                  disabled
                  v-model="address.route"
                  class="form-control"
                />
              </p>
              <p>
                <v-text-field
                  name="city"
                  label="City"
                  disabled
                  v-model="address.locality"
                  class="form-control"
                />
              </p>
              <p>
                <v-text-field
                  name="state"
                  label="Province"
                  disabled
                  v-model="address.administrative_area_level_1"
                  class="form-control"
                />
              </p>
              <p>
                <v-text-field
                  name="zip"
                  label="Postal Code"
                  disabled
                  v-model="address.postal_code"
                  class="form-control"
                />
              </p>
              <p>
                <v-text-field
                  name="country"
                  label="Country"
                  disabled
                  v-model="address.country"
                  class="form-control"
                />
              </p>
              <v-divider />
              <p class="text-left font-weight-black subtitle-1">
                Last Step : Please enter the phone number of the property owner
              </p>
              <v-text-field
                label="Property owner's phone number"
                :rules="fieldRules"
                v-model="mobileNumber"
              />
              <p class="text-left font-weight-black subtitle-2 mt-2">
                Ready? Press the below button to see if the property has been
                spotted
              </p>
              <v-btn
                color="blue"
                style="color: white"
                block
                x-large
                :loading="isLoading"
                elevation="0"
                @click="storeSpot"
                >Spot House</v-btn
              >
            </v-form>
          </v-flex>
        </v-card-actions>
      </v-card>
      <v-overlay v-model="dialog">
        <v-row>
          <v-col>
            <v-card>
              <v-card-text style="font-size:24px ; color:white ; font-weight:450">
                Sorry! That address has already been spotted!
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn @click="dialog = false" color="success"
                  >I understand.</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-overlay>
    </v-flex>
  </v-container>
</template>

<script>
import { spotCollection, auth, storage } from "../firebase";
import router from "@/router";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      valid: false,
      dialog: false,
      id: null,
      placeResultData: [],
      address: [],
      field2: null,
      mobileNumber: null,
      selected: null,
      addr2: null,
      street_number: null,
      route: null,
      locality: null,
      administrative_area_level_1: null,
      postal_code: null,
      country: null,
      latitude: null,
      fieldRules: [(v) => !!v || "this field is required"],
      longitude: null,
      placeId: "",
    };
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      this.placeResultData = placeResultData;
      this.id = id;
      this.street_number = this.address.street_number;
      this.route = this.address.route;
      this.locality = this.address.locality;
      this.administrative_area_level_1 =
        this.address.administrative_area_level_1;
      this.postal_code = this.address.postal_code;
      this.country = this.address.country;
      this.latitude = this.address.latitude;
      this.longitude = this.address.longitude;
      this.placeId = this.address.place_id;
      console.log(this.address);
      console.log(this.placeId);
    },
    async checkID() {
      const spot = await spotCollection
        .where("placeId", "==", this.address.place_id)
        .get();
      console.log(spot);
    },
    async storeSpot() {
      const spot = await spotCollection
        .where("placeId", "==", this.address.place_id)
        .get();
      // spotCollection.where('placeId', '==', this.address.place_id).get()

      if (spot.empty == false) {
        this.dialog = true;
      } else {
        try {
          this.isLoading = true;

          // // upload file
          // const fileRef = 'uploads/spots/' + this.file.name
          // const snapshot = await storage.ref(fileRef).put(this.file)

          let data = {
            userId: auth.currentUser.uid,
            street_number: this.street_number,
            route: this.route,
            locality: this.locality,
            administrative_area_level_1: this.administrative_area_level_1,
            postal_code: this.postal_code,
            country: this.country,
            mobileNumber: this.mobileNumber,
            latitude: this.latitude,
            longitude: this.longitude,
            placeId: this.placeId,
            estateAgent: null,
            date_spotted: new Date(),
            // image: fileRef
          };
          const doc = spotCollection.add(data);

          this.isLoading = false;
          this.dialog = false;
          router.push("/dashboard");
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>

<style scoped>
</style>