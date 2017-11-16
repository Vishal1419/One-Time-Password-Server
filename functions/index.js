const admin = require('firebase-admin');
const functions = require('firebase-functions');

const serviceAccount = require('./service_account.json');
const createUser = require('./create_user');
const requestOTP = require('./request_otp');
const verifyOTP = require('./verify_otp');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-43d8d.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.requestOTP = functions.https.onRequest(requestOTP);
exports.verifyOTP = functions.https.onRequest(verifyOTP);