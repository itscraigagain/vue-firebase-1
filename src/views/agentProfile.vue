<template>
  <v-container>
    <v-card-actions>
      <v-btn color="warning" to="/dashboard">Go Back</v-btn>
    </v-card-actions>
    <v-card max-width="512px">
      <v-card-title>View/Edit your Profile</v-card-title>
      <v-card-text v-if="address==null">
          Please provide us with your details so we can provide clients with as much information as possible
      </v-card-text>
      
      <v-card-actions>
        
      </v-card-actions>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Your Name"
            v-model="name"
            :disabled="!editing"
          ></v-text-field>
          <v-text-field
            label="Phone Number"
            v-model="phone"
            :disabled="!editing"
          ></v-text-field>
          <vuetify-google-autocomplete
          v-if="editing"
            id="map"
            placeholder="Your City"
            types="(cities)"
            v-on:placechanged="getAddressData"
          >
          </vuetify-google-autocomplete>
          <v-text-field
          v-if="!editing"
            label="Your City"
            v-model="address"
            :disabled="!editing"
          ></v-text-field>
          <v-text-field
            label="Postal Code"
            v-model="postcode"
            :disabled="!editing"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
      <transition name="fade" mode="out-in">  
        <v-btn color="success" v-if="editing" @click="updateProfile"
          >Save</v-btn
        > </transition>
        <transition name="fade" mode="out-in">
          <v-btn color="success" v-if="!editing" @click="editing = true"
          >Edit</v-btn
        > </transition>
      </v-card-actions>
    </v-card>
    <v-card class="mt-2">
      <v-data-table
    :headers="headers"
    :items="assignedProperties"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Properties Assigned to you</v-toolbar-title>
        
      </v-toolbar>
    </template>
    <template @click="newHouse(item)" v-slot:item.actions="{ item }">
      <v-btn @click="newHouse(item)">
      <v-icon small > mdi-store-plus </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    
  </v-data-table>
  
    </v-card>
    <v-card class="mt-2">
      <v-data-table
    :headers="headers"
    :items="spottedProperties"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Your Spotted Properties</v-toolbar-title>
        
      </v-toolbar>
    </template>
    <template @click="newItem(item)" v-slot:item.actions="{ item }">
      <v-btn >
      <v-icon small > mdi-store-plus </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
    
  </v-data-table>
  
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-card-text>
          <v-text-field
            name="name"
            label="Number of Bedrooms"
            id="id"
          ></v-text-field>
          <v-text-field
            name="name"
            label="Number of Bathrooms"
            id="id"
          ></v-text-field>
          <v-text-field
            name="name"
            label="Number of Living rooms"
            id="id"
          ></v-text-field>
          <v-text-field
            name="name"
            label="Number of Garages"
            id="id"
          ></v-text-field>
          <v-checkbox label="Swimming Pool?" v-model="swimmingpool" ></v-checkbox>
          <v-checkbox label="Garden?" v-model="garden" ></v-checkbox>
          <v-checkbox label="Car Port?" v-model="carport" ></v-checkbox>
          <v-checkbox label="Security Fence?" v-model="securityfence" ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = !dialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { usersCollection, auth, spotCollection, listedProperties } from "@/firebase";
export default {
  data() {
    return {
      editing: false,
      name: null,
      garden : false,
      swimmingpool : false,
      carport: false,
      securityfence: false,
      phone: null,
      address: null,
      postcode: null,
      dialog: false,
      locality: "",
      headers: [
        {
          text: "Street Number",
          align: "start",
          sortable: false,
          value: "street_number",
        },
        { text: "Street", value: "route" },
        { text: "Province", value: "administrative_area_level_1" },
        { text: "Locality", value: "locality" },
        { text: "Postal Code", value: "postal_code" },
        { text: "Phone Number", value: "mobileNumber" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      spottedProperties: [],
      assignedProperties: [],
    };
  },
  created() {
    this.getProfile();
    this.getSpots();
    this.getagentSpots();
  },
  mounted () {
  window.scrollTo(0, 0)
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
    },
    newHouse(item) {
      this.editedIndex = this.assignedProperties.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // do this by adding it to computed as well as implement bottom piece
    async getSpots() {
      try {
        const querySnapshot = await spotCollection.where('userId' , '==' , auth.currentUser.uid).get();
        querySnapshot.forEach(async (doc) => {
          this.spottedProperties.push({
            street_number: doc.data().street_number,
            route: doc.data().route,
            administrative_area_level_1: doc.data().administrative_area_level_1,
            mobileNumber: doc.data().mobileNumber,
            postal_code: doc.data().postal_code,
            country: doc.data().country,
            locality : doc.data().locality
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getagentSpots() {
      try {
        const querySnapshot2 = await spotCollection.where('estateAgent' , '==' , this.name).get();
        querySnapshot2.forEach(async (doc) => {
          this.assignedProperties.push({
            street_number: doc.data().street_number,
            route: doc.data().route,
            administrative_area_level_1: doc.data().administrative_area_level_1,
            mobileNumber: doc.data().mobileNumber,
            postal_code: doc.data().postal_code,
            country: doc.data().country,
            locality : doc.data().locality
          });
        }); console.log(this.name)
      } catch (e) {
        console.log(e);
      }
    },
    getProfile() {
      usersCollection
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            this.name = doc.data().name;
            this.phone = doc.data().phone;
            this.address = doc.data().address;
            this.postcode = doc.data().postcode;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
    updateProfile() {
      usersCollection.doc(auth.currentUser.uid).set({
        name: this.name,
        phone: this.phone,
        address: this.locality,
        postcode: this.postcode,
      });
      console.log(auth.currentUser.uid);
      this.editing = false;
    },
  },
  // async mounted() {
  //   await this.getProfile();

  // },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>