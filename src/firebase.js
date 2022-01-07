import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// replace the values with your firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBywjak4RBOJvX1wK96hph9wwZ5w1kK2bY",
  authDomain: "pspotter-88145.firebaseapp.com",
  projectId: "pspotter-88145",
  storageBucket: "pspotter-88145.appspot.com",
  messagingSenderId: "599310455821",
  appId: "1:599310455821:web:b3380e0357122d99af3144",
  measurementId: "G-MQSWWL7X1P"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection ref
const usersCollection = db.collection('users')
const gamesCollection = db.collection('games')
const spotCollection = db.collection('spotCollection')
const listedProperties = db.collection('listedProperties')
const agentCollection = db.collection('agentCollection')
const agenciesCollection = db.collection('agencies')
const agentPasswords = db.collection('agentPassword')

export {
    db,
    auth,
    storage,
    usersCollection,
    gamesCollection,
    agenciesCollection,
    spotCollection,
    listedProperties,
    agentCollection,
    agentPasswords
}