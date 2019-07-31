import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNER = 'banner'
const USERS = 'users'
const SNS = 'post-comments'


// Setup Firebase
const config = {
  projectId: 'ssafy-245804',
  authDomain: 'ssafy-245804.firebaseapp.com',
  apiKey: 'AIzaSyAh53Ji2z1PjJFVo4EvJYe_bN9oms0iYMc',
  databaseURL: 'https://ssafy-245804.firebaseio.com',
  storageBucket: 'ssafy-245804.appspot.com',
  messagingSenderId: "452889627202",
  appId: "1:452889627202:web:b22e00319bd3559b"
}

firebase.initializeApp(config)
const firestore = firebase.firestore()
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const functions = require('firebase-functions');

exports.myFunction = functions.firestore
  .document('...')
  .onWrite((change, context) => { console.log('new 글')});

export default {
  // Listens for new messages added to /messages/:pushId/original and creates an
 // uppercase version of the message to /messages/:pushId/uppercase
    makeUppercase(){ functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });index.js
}
}
