<template>
<<<<<<< HEAD
  <section class="mt-8" id="hero">
    <!-- <v-parallax dark src="@/assets/img/bgHero.jpg" height="750"> -->
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
                <v-img style="border-radius:8px" class="my-4" contain max-height="240" max-width="480" src="@/assets/logo.jpg">
                </v-img>
              <h1 class="display-2 font-weight-bold mb-4" style="color:white">Welcome to Property Spotter</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur <br />
                adipisicing elit. Maiores porro voluptatibus <br />
                delectus nam optio harum!
              </h1>
              <v-btn
                rounded
                outlined
                large
                dark
                @click="$vuetify.goTo('#features')"
                class="mt-5"
              >
                Saiba mais
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
              <div class="video d-flex align-center py-4">
                <a @click.stop="dialog = true" class="playBut">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px"
                    y="0px"
                    width="60px"
                    height="60px"
                    viewBox="0 0 213.7 213.7"
                    enable-background="new 0 0 213.7 213.7"
                    xml:space="preserve"
                  >
                    <polygon
                      class="triangle"
                      id="XMLID_18_"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      points="73.5,62.5 148.5,105.8 73.5,149.1 "
                    />

                    <circle
                      class="circle"
                      id="XMLID_17_"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      cx="106.8"
                      cy="106.8"
                      r="103.3"
                    />
                  </svg>
                </a>
                <p class="subheading ml-2 mb-0">Assista o vídeo</p>
              </div>
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="svg-border-waves text-white">
        <!-- <v-img src="@/assets/img/borderWaves.svg" /> -->
      </div>
    </v-parallax>
    <v-container fluid id="features" class="mt-2">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <!-- <v-col cols="12" class="text-center">
              <h1 class="font-weight-light display-2">Title</h1>
              <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </v-col> -->
            <v-col
              cols="12"
              sm="4"
              class="text-center"
              v-for="(feature, i) in features"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="card"
                  shaped
                  :elevation="hover ? 10 : 4"
                  :class="{ up: hover }"
                >
                  <v-img
                    max-width="100px"
                    class="d-block ml-auto mr-auto"
                    :class="{ 'zoom-efect': hover }"
                  ></v-img>
                  <h1 class="font-weight-regular">{{ feature.title }}</h1>
                  <h4 class="font-weight-regular subtitle-1">
                    {{ feature.text }}
                  </h4>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="640px">
      <v-card>
        <youtube
          :video-id="videoId"
          @ready="ready"
          @playing="playing"
        ></youtube>
      </v-card>
    </v-dialog>
    <div class="svg-border-waves">
      <!-- <img src="~@/assets/img/wave2.svg" /> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      videoId: "i8IvvHJssWE",
      features: [
        {
          title: "Design Limpo",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          title: "Dados Seguros",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          title: "Código Aberto",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
    };
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.pause();
      }
    },
  },
  methods: {
    ready(event) {
      this.player = event.target;
    },
    playing(event) {
      // The player is playing a video.
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = "another video id";
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
=======
  <div class="home">
    <v-row>
      <v-col cols="3">
        <v-card class="mx-auto">
            <v-card-title>
                <h1>Login to buy MGT</h1>
            </v-card-title>
            <v-divider/>
            
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card class="mx-auto">
            <v-card-title>
                <h1>Latest Purchases</h1>
            </v-card-title>
            <v-card-text>
                <v-data-table>
                </v-data-table>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <p v-if="games.length == 0">No games found</p>
    <v-row>
      <v-col md="4" v-for="game in games" :key="game.id">
        <v-card>
          <v-img
            v-if="game.image"
            height="250"
            :src="game.image"
            lazy-src="https://via.placeholder.com/250"
          >
          </v-img>
          <v-card-title>{{ game.title }}</v-card-title>
          <v-card-text>
            <p class="body-1">Developer: {{ game.developer }}</p>
            <p class="body-1">Publisher: {{ game.publisher }}</p>
            <p class="body-1">Posted By: {{ game.author }}</p>
            <p>{{ game.description }}</p>

            <v-btn block color="primary">Learn More</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { auth, storage, gamesCollection, usersCollection } from "../firebase";
export default {
  name: "Home",
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async getGames() {
      try {
        const querySnapshot = await gamesCollection.get();
        querySnapshot.forEach(async (doc) => {
          let img = "";
          if (doc.data().image) {
            img = await storage.ref().child(doc.data().image).getDownloadURL();
          }
          let authorQuery = await usersCollection.doc(doc.data().userId).get();
          this.games.push({
            id: doc.id,
            title: doc.data().title,
            developer: doc.data().developer,
            publisher: doc.data().publisher,
            description: doc.data().description,
            image: img,
            img: doc.data().image,
            author: authorQuery.data().name,
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  
  async mounted() {
    await this.getGames();
>>>>>>> 55f8bde27240e28084f7da248cc0f9ef1c4803b7
  },
};
</script>

<style lang="scss">
.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}
.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;
  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }
  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;
      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.btn-play {
  transition: 0.2s;
}
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
#hero {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}
.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}
.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}
.card h1 {
  margin-bottom: 10px;
}
.zoom-efect {
  transform: scale(1.1);
}
.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}
</style>

<style>
section {
  position: relative;
}
</style>