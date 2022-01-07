<template>
  <v-container>
    <v-card-actions>
      <v-btn color="warning" to="/dashboard">Go Back</v-btn>
    </v-card-actions>
    <v-card max-width="512px">
      <v-card-title>View/Edit your Profile</v-card-title>
      
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
            v-model="address"
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
    :items="spottedProperties"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Your Spotted Properties</v-toolbar-title>
        
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="editItem(item)"> mdi-edit </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { usersCollection, auth, spotCollection } from "@/firebase";
export default {
  data() {
    return {
      editing: false,
      name: null,
      phone: null,
      address: null,
      postcode: null,
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
    };
  },
  created() {
    this.getProfile();
    this.getSpots();
  },
  mounted () {
  window.scrollTo(0, 0)
},
  methods: {
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
        address: this.address,
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