<template>
    <div class="py-1">
        <v-container fluid class="spacing-playground my-2">
            <v-row>
                <v-col align="center" justify="center">
                    <v-card max-width="512px" elevation="0" class="px-4 py-4 text-center" >
                            <h1 class="pb-2">Hi, {{ userProfile.name }}</h1>
                            <div v-if="userProfile.address!=''">
                            <v-card-text style="font-weight:500 ;  font-size:32px ; color:#CAE3F7 ; text-shadow: .5px .5px 2.5px #000000;" class=" mt-2">
                            <span style=" ">Houses you <span style="color:red ; font-weight:1000">have</span> to see</span>
                            </v-card-text>
                            </div>
                            <v-divider class="mt-4"/>   
                            <v-card-text style="font-weight:900 ;  font-size:32px ; color:#5AA9E6 ; text-shadow: .5px .5px 2.5px #000000;" class=" mt-2">
                            <span style=" ">Spot a house</span>
                            </v-card-text>
                            <v-card-text>
                            <p >
                                Spot a house and get commission by following  only a few steps! Press the button to continue!
                            </p>
                            </v-card-text>
                            <v-btn elevation="8" x-large fab width="275px"   to="/spotting" height="275px"  class="blue-grey lighten-3 animate__animated animate__pulse animate__infinite animate__slow " text >
                            <v-card-text>
                            <v-img max-width="254" max-height="254" src="@/assets/spothouse.png"></v-img>
                            <span style="font-weight:900 ;  font-size:28px ; color:#CAE3F7 ; text-shadow: .5px .5px 2.5px #000000;">Spot Now</span>
                            </v-card-text>
                            </v-btn>
                            
                            <v-divider class="mt-4"/>
                            <v-card-text  style="font-weight:900 ;  font-size:32px ; color:#2186D4 ; text-shadow: .5px .5px 2.5px #000000;" class=" mt-2">
                            <span v-if="haveSpots" style=" " >The last house you spotted</span>
                            <span v-if="!haveSpots" style="color:yellow " >Spot some houses to see recently spotted houses</span>
                            
                            </v-card-text>
                            <v-card-text>
                            <v-row v-for="(latestSpots, i) in latestSpots.slice(0,2)" :key="i">
                                <v-card class="mx-auto my-1" max-height="64px">
                                <v-card-text> {{latestSpots.streetname}} , <span style="color: red">{{latestSpots.estateAgent}}</span> </v-card-text>
                                </v-card>
                            </v-row>
                            </v-card-text>
                            <!-- <v-btn  to="/search" height="262px" class="searchBack mt-3" x-large block style="font-weight:900">Search for a new house</v-btn>
                            <v-btn class="mt-3" to="/spotterProfile" height="262px" x-large block style="font-weight:900">My Profile</v-btn> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { spotCollection, auth } from "@/firebase";
import { mapState } from 'vuex';
import router from '@/router';
export default {
    data () {
        return {
            latestSpots : [],
            haveSpots : false,
        };
    },
    computed: {
        ...mapState(['userProfile']),
    },

    onMounted() {
    },
    created(){
        this.latestSpot()
        console.log(this.latestSpots)
        // console.log(auth.currentUser.uid)
        
    },
    methods: {
    backHome () {
        if (this.$store.state.userProfile.length==0) {
            router.push('/login')
        }
    },
    async latestSpot() {
      try {
        const querySnapshot = await spotCollection.where('userId' , '==' , auth.currentUser.uid).get();
        if (querySnapshot.empty==false) {this.haveSpots=true 
        querySnapshot.forEach(async (doc) => {
          this.latestSpots.push({
            streetname: doc.data().street_number + ', ' + doc.data().route + ', ' +  doc.data().administrative_area_level_1,
            estateAgent : (doc.data().estageAgent ? "Active" : "Inactive" ),
            date_spotted : doc.data().date_spotted
          });
        });}else {console.log()}
        
      } catch (e) {
        console.log(e);
      } 
    },
    }
    
}
</script>
<style>
.btn {
    font-weight : 'bold'
}

.searchBack {
    background: url( '../assets/searchsmall.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

</style>