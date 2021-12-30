import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// replace the values with your firebase config
var firebaseConfig = {
    apiKey: "AIzaSyBVdJCb_IeyXQGwqn3Z_3m5ptNkTOMDano",
    authDomain: "megatechotc.firebaseapp.com",
    projectId: "megatechotc",
    storageBucket: "megatechotc.appspot.com",
    messagingSenderId: "315396149432",
    appId: "1:315396149432:web:15e62582dbcb093f74e44d"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection ref
const usersCollection = db.collection('users')
const gamesCollection = db.collection('games')
const ordersCollection = db.collection('orders')

export {
    db,
    auth,
    storage,
    usersCollection,
    gamesCollection,
    ordersCollection
}