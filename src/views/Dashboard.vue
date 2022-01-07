<template>
    <div class="dashboard">
        
                <homeScreen/>
           

        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GameForm from '@/components/GameForm'
import { auth, storage, gamesCollection } from '../firebase'
import homeScreen from '@/components/ActivityHome.vue'
export default {
    components: {
        GameForm,
        homeScreen
    },
    data() {
        return {
            games: [],
            pId: null,
            pTitle: null,
            deleteDialog: false
        }
    },
    computed: {
        ...mapState(['userProfile']),
         function() {
            console.log(this.$store.state.userProfile)
        }
    },
    methods: {
        async addGame(doc) {
            let img = ''
            if(doc.image) {
                img = await storage.ref().child(doc.image).getDownloadURL()
            }
            this.games.push({
                id: doc.id,
                title: doc.title,
                developer: doc.developer,
                publisher: doc.publisher,
                description: doc.description,
                image: img,
                img: doc.image
            })
        },

        async updateGame(doc) {
            let img = ''
            if(doc.image) {
                img = await storage.ref().child(doc.image).getDownloadURL()
            }
            this.games.splice(doc.index, 1, {
                id: doc.id,
                title: doc.title,
                developer: doc.developer,
                publisher: doc.publisher,
                description: doc.description,
                image: img,
                img: doc.image
            })
        },

        async getGames() {
            try {
                const querySnapshot = await gamesCollection.where('userId', '==', auth.currentUser.uid).get()
                querySnapshot.forEach( async (doc) => {
                    let img = ''
                    if(doc.data().image) {
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
                    }
                    this.games.push({
                        id: doc.id,
                        title: doc.data().title,
                        developer: doc.data().developer,
                        publisher: doc.data().publisher,
                        description: doc.data().description,
                        image: img,
                        img: doc.data().image
                    })
                })
            } catch(e) {
                console.log(e)
            }
        },

        async deleteConfirm(id, title) {
            this.deleteDialog = true
            this.pId = id
            this.pTitle = title
        },

        async deleteGame() {
            try {
                await gamesCollection.doc(this.pId).delete()
                alert('Game deleted!')

                // remove game from array
                this.games.splice(this.games.findIndex(x => x.id == this.pId), 1)
                this.deleteDialog = false

                // reset
                this.pId = null
                this.pTitle = null
            } catch(e) {
                console.log(e)
            }
        }
    },
    async mounted() {
        await this.getGames(),
        window.scrollTo(0, 0)
    }
  
}
</script>