<template>
<<<<<<< HEAD
  <v-row class="mt-2" justify="center">
    <v-col class="mt-4" md="4">
      <v-card style="background-color:#F7F7F7" class="mt-3" elevation="2">
        <v-row class="mb-4">
            <v-col justify="center" align="center">
              <v-img max-width="300px" src="@/assets/logo.jpg"> </v-img>
            </v-col>
          </v-row>
        <v-card-title>Registration</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              outlined
              required
            >
            </v-text-field>
=======
    <v-row justify="center">
        <v-col md="4">
            <v-card elevation="2">
                <v-img src="@/assets/login.png"></v-img>
                <v-card-title>Register</v-card-title>
                <v-card-text>
                    <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                        <v-text-field
                            v-model="name"
                            :rules="nameRules"
                            label="Name"
                            outlined
                            required
                        >
                        </v-text-field>
>>>>>>> 55f8bde27240e28084f7da248cc0f9ef1c4803b7

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              outlined
              required
            >
            </v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              outlined
              required
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            >
            </v-text-field>

            <v-checkbox
              v-model="isAgent"
              :label="`Are you an Estate Agent?`"
            ></v-checkbox>

            <v-text-field
              v-model="agentPassword"
              label="Issued Agent Password"
              outlined
              required
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              v-if="isAgent"
            >
            </v-text-field>
            <v-select
              :items="this.agencies"
              :rules="[(v) => !!v || 'Agency is required']"
              required
              v-model="selectedAgency"
              item-text="agency"
              label="Select Agency"
              v-if="isAgent"
            ></v-select>
            

            <v-btn
              elevation="2"
              color="primary"
              @click="register"
              :loading="isLoading"
            >
              Register
            </v-btn>
          </v-form>

          <p class="pt-2">
            Already have an account?
            <router-link :to="{ name: 'Login' }">Login Now</router-link>
          </p>
        </v-card-text>
      </v-card>
      <v-dialog max-width="512"  v-model="dialog">
        <v-card >
          <v-card-text class="pt-4">
        <p style="font-size:18px ; font-weight:650 ; color:Red">{{ this.errorMsg }}</p>
          </v-card-text>
          <v-card-actions>
        <v-btn @click="dialog = false" text class="success"> I Understand </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>


<script>
import { agentPasswords, agenciesCollection } from "@/firebase";
export default {
  data() {
    return {
      dialog: false,
      isAgent: false,
      agentPassword: null,
      selectedAgency: null,
      agencies: [],
      errorMsg: "",
      isLoading: false,
      show: false,
      show2: false,
      valid: false,
      name: "",
      email: "",
      password: "",
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be 8 characters or more",
      ],
    };
  },
  created () {
    this.getAgencies()
  },
  methods: {
    async register() {
      const valid = this.$refs.form.validate();
      const passwords = await agentPasswords
        .where("Password", "==", this.agentPassword)
        .get();

      if (this.isAgent == true) {
        // console.log(passwords)
        // console.log(this.agentPassword)
        if (passwords.empty == false) {
          this.isLoading = true;
          this.$store.dispatch("register", {
            name: this.name,
            email: this.email,
            password: this.password,
            estateAgent: this.isAgent,
            agency: this.selectedAgency,
          });
        } else {
          this.dialog = true;
          this.errorMsg = "The password is incorrect"
        }
      } else {
        if (valid) {
          try {
            this.isLoading = true;
            this.$store.dispatch("register", {
              name: this.name,
              email: this.email,
              password: this.password,
              estateAgent: this.isAgent,
            });
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.dialog=true;
            this.errorMsg=errorCode + ' ' + errorMessage
          }
        }
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