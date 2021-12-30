<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card max-width="620px">
          <v-card-media
            style="background-color: red"
            src="src"
            minheight="200px"
          >
          </v-card-media>
          <v-card-title primary-title style="word-break: break-word">
            <div>
              <h2 style="font-weight: 550" class="headline mb-0">
                Your Profile
              </h2>
              <div style="font-weight: 350; font-size: 14px">
                Please fill out your profile below to proceed to the Megatech
                OTC
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <template>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  label="Name & Surname"
                  v-model="name"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  class="mb-1"
                  name="Country of Residence"
                  :rules="countryRules"
                  label="Your Country"
                  id="id"
                ></v-text-field>
                <v-divider class="mb-4" />
                <div style="font-size: 16px; font-weight: 500">
                  <span style="color: red">Important! </span> You can get your
                  apollo wallet address from
                  <a href="https://www.apollowallet.org" target="_blank">
                    apollowallet.org
                  </a>
                </div>
                <v-text-field
                  class="mb-1"
                  name="Apollo Wallet Address"
                  label="Enter your apollo wallet address here"
                  hint="APL-XXXX-XXXX-XXXX-XXXXX"
                  :rules="walletRules"
                  id="id"
                ></v-text-field>
                <v-divider />
                <v-checkbox
                  label="Are you sure the information above is correct?"
                  v-model="checkbox"
                  :rules="[(v) => !!v || 'You must agree to continue!']"
                  required
                ></v-checkbox>
              </v-form>
            </template>

            <!--
                <script>
                import axios from "axios";
                
                export default {
                    
                
                    methods: {
                        submit() {
                            if (this.$refs.form.validate()) {
                                // Native form submission is not yet supported
                                axios.post("/api/submit", {
                                    name: this.name,
                                    email: this.email,
                                    select: this.select,
                                    checkbox: this.checkbox
                                });
                            }
                        },
                        clear() {
                            this.$refs.form.reset();
                        }
                    }
                };
                </script>
                -->
          </v-card-text>
          <v-card-actions>
            <v-btn class="hvr-shutter" @click="submit" :disabled="!valid" color="primary">
              Submit profile
            </v-btn>
            <v-btn color="red" @click="clear">clear</v-btn>
            <v-btn flat color="warning">Go back</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    countryRules: [
      (v) => !!v || "Country of residence is required",
      (v) => (v && v.length <= 10) || "Please enter your country",
    ],
    walletRules: [
      (v) => !!v || "APL-XXXX-XXXX-XXXX-XXXXX",
      (v) =>
        (v && v.length == 24) ||
        "You wallet address is incorrect, make sure your copied it correctly!",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    select: null,
    checkbox: false,
  }),
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.hvr-shutter {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  background: #e1e1e1;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-shutter:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2098D1;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-shutter:hover, .hvr-shutter-out-horizontal:focus, .hvr-shutter-out-horizontal:active {
  color: white;
}
.hvr-shutter:hover:before, .hvr-shutter-out-horizontal:focus:before, .hvr-shutter-out-horizontal:active:before {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
</style>