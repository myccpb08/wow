const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore()


exports.sendToDeviceNoti = functions.firestore.document('/posts/{any}')
    .onCreate(event => {
        const payload = {
            notification: {
                title: '포스트 폴더에 변경 생겨써',
                body: 'This is send to device test'
            }
        };
        console.log(db)
        // db.collection('tokens')
        // .get()
        // .then((snapshot)=>{
        //   snapshot.forEach(doc => {
        //     admin.messaging().sendToDevice(doc.data()['test_token'], payload);
        //   })
        // })
        // return admin.messaging().sendToDevice('eS4XbxP6vXU:APA91bGJitzI8MwLCbvWdSNF2mDg0FhHt4RbMPhbqQ35LXyCXy5MO_IC3XUjEMhntROAMCWajeQWv3kpyI9BDJ7PBQBh31OBcYw7rmuwsjDOiRfnwoSrK0KzPh9HaXSNQf4PrIOqJ0Vk', payload);
    });
    exports.createPortfolio = functions.firestore
        .document('posts/{Id}')
        .onCreate((snap, context) => {

            db.collection('tokens').get().then((snapshot) => {
                    snapshot.forEach(doc => {
                        if (doc.data()['test_token']) {
                            var message = {
                                data: {
                                    title: 'New',
                                    body: 'New Portfolio'
                                },
                                token: doc.data()['test_token']
                            };


                            // Send a message to the device corresponding to the provided
                            // registration token.
                            admin.messaging().send(message)
                                .then((response) => {
                                    // Response is a message ID string.
                                    console.log('Successfully sent message:', response);
                                })
                                .catch((error) => {
                                    console.log('Error sending message:', error);
                                });
                        }
                    });
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });

            // // Create and Deploy Your First Cloud Functions
            // // https://firebase.google.com/docs/functions/write-firebase-functions
            //
            // exports.helloWorld = functions.https.onRequest((request, response) => {
            //  response.send("Hello from Firebase!");
        });
