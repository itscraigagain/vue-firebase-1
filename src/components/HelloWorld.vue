<template>
  <div>
    <v-container>
      <v-row class="mb-4">
        <v-col justify="center" align="center">

        <v-img max-width="300px" src="@/assets/logo.jpg">

        </v-img>
        </v-col>
      </v-row>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title class="d-none d-md-block">
              <v-layout align-center>
                <h3  class="headline ">
                  Property Spotter
                </h3>
                <p>{{this.errorMsg}}</p>
              </v-layout>
              <v-spacer/>
                <v-btn class="d-none d-md-block" @click="value=2">PDash Login</v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-overlay :value="isLoading">
              <v-progress-circular :value="20"></v-progress-circular>
            </v-overlay>
            <v-tabs
              v-model="value"
              color="primary"
              slider-color="primary"
              grow
            >
              <v-tab>Login</v-tab>
              <v-tab>Sign up</v-tab>
              <v-tab class="d-none">Admin</v-tab>
              <v-tab class="d-none">Forgot Password</v-tab>
            </v-tabs>
            <v-tabs-items v-model="value">
              <v-tab-item>
            <v-card-text>
              <p>Sign in with your Email and password:</p>
              <v-form>
                <v-text-field
                              outline
                              label="Email"
                              type="text"
                              :rules="emailRules"
                              v-model="email"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              :rules="passwordRules"
                              type="password"
                              v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn @click="value=1" color="info" >
                Sign up
              </v-btn>
              <v-btn @click="value=3" color="warning" x-small  style="font-size: 8px" text class="body-2" >
                Forgot password?
              </v-btn>
              
              <v-spacer></v-spacer>
              <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" @click="login">
                <v-icon left>mdi-lock</v-icon>
                Login
              </v-btn>
            </v-card-actions>
              </v-tab-item>
              <v-tab-item>
                <v-card-text>
              <p>Sign up by supplying an email address and password:</p>
              <v-form  ref="form" v-model="valid" lazy-validation>
                 <v-text-field
                              outline
                              label="Name"
                              type="text"
                              required
                              v-model="name"></v-text-field>
                <v-text-field
                              outline
                              label="Email"
                              :rules="emailRules"
                              type="text"
                              v-model="email"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              :rules="passwordRules"
                              type="password"
                              v-model="password"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Confirm Password"
                              :rules="passwordRules"
                              type="password"
                              ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              
              <v-spacer></v-spacer>
              <v-btn :loading="isLoading" color="info" :large="$vuetify.breakpoint.smAndUp" >
                <v-icon left>mdi-lock</v-icon>
                Signup
              </v-btn>
            </v-card-actions>
              </v-tab-item>
              <v-tab-item>
            <v-card-text>
              <p>Sign in with your email and password:</p>
              <v-form>
                <v-text-field
                              outline
                              label="Email"
                              type="text"
                              v-model="email"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              
              
              <v-spacer></v-spacer>
              <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" >
                <v-icon left>mdi-lock</v-icon>
                Login
              </v-btn>
            </v-card-actions>
              </v-tab-item>
              <v-tab-item>
                <v-card-text>
              <p>Enter your email address to get a reset password link:</p>
              <v-form>
                <v-text-field
                              outline
                              label="Email Address"
                              type="text"
                              v-model="email"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              
              <v-spacer></v-spacer>
              <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" > 
                <v-icon left>mdi-lock</v-icon>
                Signup
              </v-btn>
            </v-card-actions>
              </v-tab-item>
            </v-tabs-items>
            
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Privacy Policy</a>
              |
              <a href="#">Terms of Service</a>
            </p>
            <p class="caption my-3">Powered by <a href="#">Looper</a></p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</div>
</template>

<script>
// import firebase from 'firebase'
// import router from '@/router'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();

  export default {
    name: 'HelloWorld',

     data () {
    return {
      show: false,
      valid: false,
      value: 0,
      name: '',
      email: '',
      password: '',
      form: false,
      errorMsg: '',
      isLoading : false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be 8 characters or more",
      ],
    }},
    methods: {
      login() {
            const valid = this.$refs.form.validate()
            if(valid) {
                this.isLoading = true
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })
            } 
        },
      signUpWithEmailAndPassword() {
       alert()
      }
  }
  }
</script>
<style>
.v-btn,
.v-card {
  border-radius : 4px }
.v-card__title {
  text-transform : uppercase }
</style>
