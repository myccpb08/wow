// 서비스워커 파일

importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const config = {
   projectId: 'ssafy-245804',
   authDomain: 'ssafy-245804.firebaseapp.com',
   apiKey: 'AIzaSyAh53Ji2z1PjJFVo4EvJYe_bN9oms0iYMc',
   databaseURL: 'https://ssafy-245804.firebaseio.com',
   storageBucket: 'ssafy-245804.appspot.com',
   messagingSenderId: "452889627202",
  appId: "1:452889627202:web:b22e00319bd3559b"
}

firebase.initializeApp(config);

const messaging = firebase.messaging()

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END background_handler]
