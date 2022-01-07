<template>
<<<<<<< HEAD
  <v-app id="app" style="background-color: #509EDE">
    <v-overlay v-model="isLoading">
    </v-overlay>
    <v-app-bar app color="white" flat>
      <transition name="fade-transition" mode="out-in">
      <v-btn v-if="!isLoading" to="/adminDash" text>Admin</v-btn>
      </transition>
      <v-spacer></v-spacer>
      <!-- <div id="nav">
        <router-link to="/">Login</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/Home">Home</router-link> |
        <router-link to="/spotter">Spotter</router-link> |
        <router-link to="/search">Search</router-link> |
        <router-link to="/spotprofile">Profile</router-link>
      </div> -->
      <div v-if="!isAuthenticated">
        <transition name="fade">
        <v-btn v-if="!isLoading" style="color:#5AA9E6" :to="{ name: 'Login' }" text>Login</v-btn>
         </transition>
         <transition name="fade">
        <v-btn v-if="!isLoading" style="color:#5AA9E6" :to="{ name: 'Register' }" text>Register</v-btn>
        </transition>
       
      </div>
      <div v-else>
        <v-btn @click="logout" style="color:#5AA9E6 ;" text>Logout</v-btn>
      </div>
    </v-app-bar>

      <v-main style="padding:48px 4px 32px 4px">
        <v-fade-transition>
        <!-- <transition 
        mode="out-in"
       name="fade"
        > -->
        <router-view  class="pb-4">
        </router-view>
        </v-fade-transition>
        
       
        <!-- </router-view> -->
        
      </v-main>
    <v-bottom-navigation  fixed v-if="isAuthenticated">
    <v-btn to="/dashboard">
    <span>Home</span>

    <v-icon color="#5AA9E6">mdi-home</v-icon>
    </v-btn>
      <v-divider vertical/>
    <v-btn to="/search">
      <span>Search</span>

      <v-icon color="#5AA9E6">mdi-home-search-outline</v-icon>
    </v-btn>
    <v-divider vertical/>

    <v-btn to="/spotterProfile" v-if="!this.$store.state.userProfile.agent"> 
      <span>My Profile</span>

      <v-icon color="#5AA9E6">mdi-account</v-icon>
    </v-btn>
    <v-btn to="/agentProfile" v-if="this.$store.state.userProfile.agent"> 
      <span>Agent Profile</span>

      <v-icon color="#5AA9E6">mdi-account</v-icon>
    </v-btn>

    
  </v-bottom-navigation>
  </v-app>
=======
    <v-app style="background-color:#EBF6FF">
        <v-app-bar
            app
            color="white"
			flat
        >
            <v-btn to="/" text><v-img max-width="172px" contain src="@/assets/g871.png"></v-img></v-btn>
			<v-spacer></v-spacer>
			<div v-if="!isAuthenticated">
				<v-btn :to="{ name: 'Login' }" text>Login</v-btn>
				<v-btn :to="{ name: 'Register' }" text>Register</v-btn>
			</div>
			<div v-else>
				<v-btn @click="logout" text>Logout</v-btn>
			</div>
        </v-app-bar>

        <v-main>
			<v-container>
				<router-view />
			</v-container>
        </v-main>
    </v-app>
>>>>>>> 55f8bde27240e28084f7da248cc0f9ef1c4803b7
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",

  data: () => ({
    isLoading:true
  }),

  computed: {
    ...mapState(["isAuthenticated"]),
  },

  mounted() {
    // console.log(this.$store.state.userProfile)
  setTimeout(() => {
      this.isLoading = false;
    }, 2200);
    // Code that will run only after the
    // entire view has been rendered
  
  },

  methods: {
    isMobile() {
   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return true
   } else {
     return false
   }
 },
    logout() {
      this.$store.dispatch("logout");
    },
  },
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
