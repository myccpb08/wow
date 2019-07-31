const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendToDeviceNoti = functions.firestore.document('/posts/{any}')
    .onWrite(event => {
        // Notification details.
        const payload = {
            notification: {
                title: '테스트왔어요',
                body: 'This is send to device test'
            }
        };
        return admin.messaging().sendToDevice('dcUfi06MlDo:APA91bEupBnhfHpn1Zpv3-JMUs44oJn-SW4wp9gbzRmef4PsSdU3RgpYqbP-pniZQvVg1muJpoERr3BDeCgRiQhk08BE-96gm2JWr3EAxllb-Fgnl17xcxobEQX0rW3Bv59KVE_CiQQu', payload);
    });



exports.sendToDeviceNotification = functions.database.ref('/')
    .onWrite(event => {
        // Notification details.
        const payload = {
            notification: {
                title: 'SendToDevice Test',
                body: 'This is send to device test'
            }
        };
        return admin.messaging().sendToDevice('dcUfi06MlDo:APA91bEupBnhfHpn1Zpv3-JMUs44oJn-SW4wp9gbzRmef4PsSdU3RgpYqbP-pniZQvVg1muJpoERr3BDeCgRiQhk08BE-96gm2JWr3EAxllb-Fgnl17xcxobEQX0rW3Bv59KVE_CiQQu', payload);
    });



exports.myFunction = functions.firestore
    .document('...')
  .onWrite((change, context) => { console.log("새글임")});

  // Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });