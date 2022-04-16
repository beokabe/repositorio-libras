// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
 
exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth.setCustomUserClains(user.uid, {
          admin: true,
      });
    }).then(() => {
        return {
            // TODO verificar se funcionou
            message: `Agora o usuário com o email ${data.email} é um administrador!`
        }
    }).catch(err => {
        console.log(err);
    });
});
