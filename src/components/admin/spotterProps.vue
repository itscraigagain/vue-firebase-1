<template>
  <v-data-table
    :headers="headers"
    :items="spottedProperties"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>All Spotted Properties</v-toolbar-title>
        <!-- <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer> -->
        <v-dialog
          v-model="dialogMsg"
          scrollable 
          persistent 
          max-width="500px"
          transition="dialog-transition"
        >
        <v-card max-width="512px">
          <v-card-text>
            You have successfully added the agent, please refresh to see changes
          </v-card-text>
          <v-card-actions>
        <v-btn @click="dialogMsg = !dialogMsg">Thank you!</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">Assign Property to agent</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                    <v-text-field
                      disabled
                      color="white"
                      item-text="name"
                      label="City"
                      v-model="editedItem.locality"
                    ></v-text-field>
                    <v-select
                      :items="agencies"
                      color="white"
                      item-text="agencyName"
                      label="Agency"
                      v-model="select"
                    ></v-select>
                    <v-select
                      v-model="editedItem.agent"
                      :items="agents"
                      label="Choose agent"
                      item-text="agentName"
                      v-if="select!=null"
                    ></v-select>
                    
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="saveAgent"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small text fab>
          <v-icon
          color="blue lighten-2"
            v-bind="attrs"
            v-on="on"
            large
            small
            @click="assignSpot(item)"
          >
            mdi-account-plus
          </v-icon>
          </v-btn>
        </template>
        <span>Assign Spot to Agent</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small text fab>
          <v-icon
          color="blue lighten-2"
            v-bind="attrs"
            v-on="on"
            large
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
          </v-btn>
        </template>
        <span>Remove Spotted address</span>
      </v-tooltip>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { spotCollection , agenciesCollection, agentCollection } from "@/firebase";
export default {
  data: () => ({
    select: null,
    dialog: false,
    dialogMsg: false,
    cityFilled: false,
    dialogDelete: false,
    agencies: [],
    agents: [],
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
      { text: "Agent", value: "agent" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    spottedProperties: [],
    editedIndex: -1,
    editedItem: {
      city: "",
      agency: "",
      agent: ""
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Assign";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getSpots();
    
    
  },

  methods: {
    async getSpots() {
      try {
        const querySnapshot = await spotCollection.get();
        querySnapshot.forEach(async (doc) => {
          this.spottedProperties.push({
            docId: doc.id,
            street_number: doc.data().street_number,
            route: doc.data().route,
            administrative_area_level_1: doc.data().administrative_area_level_1,
            mobileNumber: doc.data().mobileNumber,
            postal_code: doc.data().postal_code,
            country: doc.data().country,
            locality: doc.data().locality,
            agent : doc.data().estateAgent,
            placeId : doc.data().placeId,
          });
        }); console.log(this.spottedProperties)
      } catch (e) {
        console.log(e);
      }
    },
    async getAgencies() {
      try {
        const querySnapshot = await agenciesCollection.where("city", "==" , this.editedItem.locality).get();
        querySnapshot.forEach(async (doc) => {
          this.agencies.push({
            agencyName: doc.data().name
            
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getAgents() {
      try {
        const querySnapshot = await agentCollection.where("city", "==" , this.editedItem.locality).get();
        querySnapshot.forEach(async (doc) => {
          this.agents.push({
            agentName: doc.data().name
            
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    assignSpot(item) {
      
      this.editedIndex = this.spottedProperties.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.getAgencies();
      this.getAgents();
      console.log(this.agents);
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    async saveAgent(doc) {
            try {
            spotCollection.doc(this.editedItem.docId).update({
                estateAgent : this.editedItem.agent
            })
            this.dialogMsg=true} catch (e) {console.log(e)}
            this.dialog=false
            
            
        },
        
        
  },
};
</script>
<style>
</style>