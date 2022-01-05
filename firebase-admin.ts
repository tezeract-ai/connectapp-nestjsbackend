
var admin = require("firebase-admin");

var serviceAccount = require("../livechatapp-b3084-firebase-adminsdk-zvxx3-33c5d96c11.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://livechatapp-b3084-default-rtdb.firebaseio.com"
});

export default admin;