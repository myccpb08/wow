import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'

const POSTS = 'posts'
const PORTFOLIOS = 'portfolios'
const BANNER = 'banner'
const USERS = 'users'
const SNS = 'post-comments'
const TOKEN = 'tokens'


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
const database = firebase.database()
const messaging = firebase.messaging()

const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()


// 메시징 객체 검색 : Retrieve Firebase Messaging object
// 알림 수신 권한 요청 (알림 대화상자 동의할지 권한)


export default {
  gettingtoken(){
    messaging.usePublicVapidKey('BH4H7pKz2nJHRkzwWzgUtSna-zCJzPM-KeR_MemZjinDVVuEzd6FulRn_P4zIxZFObFkE_mvIOnKHrrBING55ZE')
    messaging.getToken().then(function(currentToken) {
      if (currentToken) {
        var test_token = currentToken
        console.log(test_token)

        // firebase.database().ref('/').push({
        //    test_token
        // })

        firestore.collection(TOKEN).doc(test_token).set({
          test_token : test_token
        })

      } else {
        console.log('No Instance ID token available. Request permission to generate one.');        // Show permission UI.
      }
    }).catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    })
  },

  alarm() {

    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        console.log('알림이 허용되었어');
    } else {
        console.log('Unable to get permission to notify.');
      }
    })
    messaging.onMessage(function(payload){
      console.log('onMessage: ', payload)
    })}, // alarm 함수 끝



    MessageSendTest(){
    // 이미 사용자가 웹페이지를 보고 있다면, 알림보다 메시지
    var key = 'AAAAaXJTSkI:APA91bGN9BUUuuk3nFfjd2suGLmQ2vmI9uuEdUSlIAxuDcTBC-_L1YzyZk13WCFZDtqx40O80hUIgvdGk_4KnsJZkUsc2ouddDlQbDBisNufRUF2JGAlyCGnS-TNGB5ctHUU4EXstJxt';
    var to = 'f-55HweHEVQ:APA91bG7Z8L_L1fQtgWFNcH1soC5LZ-cOlclKhZV9LzTERgt5IQEWX343xuXJrDxud6KMLGrCI31--BRdwEHLFTEFjzUkAUjUT4EBgC1OsrAD_O_QnaD0qi1yTXb1HrQEE_ByLEQRhLv'
    var notification = {
      'title': 'Portugal vs. Denmark',
      'body': '5 to 1',
      'icon': 'firebase-logo.png',
      'click_action': 'http://localhost:8081'
    };

fetch('https://fcm.googleapis.com/fcm/send', {
  'method': 'POST',
  'headers': {
    'Authorization': 'key=' + key,
    'Content-Type': 'application/json'
  },
  'body': JSON.stringify({
    'notification': notification,
    'to': to
  })
}).then(function(response) {
  console.log(response);
}).catch(function(error) {
  console.error(error);
})},


  // test() {
  //   const axios = require('axios')
  //   var storage = firebase.storage()
  //   var pathReference = storage.ref('result.json')
  //   pathReference.getDownloadURL().then(function(url) {
  //     // console.log(url)
  //     axios.get(url)
  //       .then(function(response) {
  //         console.log(response.data)
  //       })
  //       .catch(function(error) {
  //         console.log(error)
  //       })
  //   })
  // },

  getComments(postId) {
    const commentCollection = firestore.collection(POSTS).doc(postId).collection(SNS)
    // console.log(commentCollection)
    return commentCollection
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          // data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          console.log(2222)
          var db = admin.firestore().collection(TOKEN).get()
          console.log(db)
          return data
        })
      })
  },

  postComment(postId, content, user) {
    return firestore.collection(POSTS).doc(postId).collection(SNS).add({
      contents: content,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      email: user.email,
      edit: false
    })
  },
  editComment(postId, update_content, commentId) {
    const comment = firestore.collection(POSTS).doc(postId).collection(SNS).doc(commentId)
    comment.update({
        contents: update_content,
        edit: false,
      })
      .then(function() {
        alert('해당 댓글이 수정되었습니다');
      }).catch(function(error) {
        console.error('댓글 수정에 실패했습니다', error);
      })
  },

  deleteComment(postId, commentId) {
    const comment = firestore.collection(POSTS).doc(postId).collection(SNS).doc(commentId)
    comment.delete().then(function() {
      alert('해당 댓글이 삭제되었습니다');
    }).catch(function(error) {
      console.error('댓글 삭제에 실패했습니다', error);
    })
  },


  getPosts() {
    const postsCollection = firestore.collection(POSTS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },
  getPost(postId) {
    return firestore.collection(POSTS).doc(postId)
      .get()
      .then((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
      })
  },
  deletePost(postId) {
    const post = firestore.collection(POSTS).doc(postId)
    post.delete().then(function() {
      console.log("해당 Post가 삭제되었습니다.");
    }).catch(function(error) {
      console.error("삭제에 실패했습니다 ", error);
    })
  },
  updatePost(postId, title, body, uid) {
    return firestore.collection(POSTS).doc(postId).update({
        title: title,
        body: body,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("게시글이 수정되었습니다.");
      })
      .catch(function(error) {
        console.error("수정 실패: ", error);
      });
  },
  postPost(title, body, user) {
    return firestore.collection(POSTS).add({
      title,
      body,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          data.id = doc.id
          return data
        })
      })
  },


  getListNum(board) {
    const num = firestore.collection(board).get().then(querySnapshot => {
      return querySnapshot.size
    })
    return num;
  },
  getPortfolio(portfolioId) {
    return firestore.collection(PORTFOLIOS).doc(portfolioId)
      .get()
      .then((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
      })
  },
  deletePortfolio(portfolioId) {
    const portfolio = firestore.collection(PORTFOLIOS).doc(portfolioId)
    portfolio.delete().then(function() {
      console.log("해당 portfolio가 삭제되었습니다.");
    }).catch(function(error) {
      console.error("삭제에 실패했습니다 ", error);
    })
  },
  updatePortfolio(portfolioId, title, body, img, uid) {
    return firestore.collection(PORTFOLIOS).doc(portfolioId).update({
        title: title,
        body: body,
        img: img,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("게시글이 수정되었습니다.");
      })
      .catch(function(error) {
        console.error("수정 실패: ", error);
      });
  },
  postPortfolio(title, body, img, user) {
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  },

  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken
      let user = result.user
      return result
    }).catch(function(error) {
      console.error('[Google Login Error]', error)
    })
  },

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      let accessToken = result.credential.accessToken
      let user = result.user
      return result
    }).catch(function(error) {
      console.error('[Facebook Login Error]', error)
    })
  },
  getBanner() {
    const postsCollection = firestore.collection(BANNER)
    return postsCollection
      .orderBy('created_at', 'desc')
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          data.created_at = new Date(data.created_at.toDate())
          return data
        })
      })
  },
  postBanner(img) {
    return firestore.collection(BANNER).doc("imgid").update({
        img,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log("update banner");
      })
  },
  addLog(uid, msg) {
    return firestore.collection(USERS).doc(uid).collection("history").add({
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        msg: msg
      })
      .then(function() {

      })
  },

  initUserClass(user, userClass) {
    const usersCollection = firestore.collection(USERS).doc(user.uid).get().then((docSnapshots) => {
      if (docSnapshots._document == null) {
        firestore.collection(USERS).doc(user.uid).set({
          changed_at: firebase.firestore.FieldValue.serverTimestamp(),
          displayName: user.displayName,
          email: user.email,
          userClass: "visitor",
          uid: user.uid
        })
      }
    })
  },
  getUserClasses() {
    const usersCollection = firestore.collection(USERS)
    return usersCollection
      .get()
      .then((docSnapshots) => {
        return docSnapshots.docs.map((doc) => {
          let data = doc.data()
          return data
        })
      })
  },
  getUserClass(uid) {
    return firestore.collection(USERS).doc(uid)
      .get()
      .then((doc) => {
        let data = doc.data().userClass
        return data
      })
  },
  updateUserClass(uid, userClass) {
    return firestore.collection(USERS).doc(uid).update({
        userClass,
      })
      .then(function() {
        alert("Changed!");
      })
  }

}
