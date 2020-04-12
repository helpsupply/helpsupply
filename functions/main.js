const functions = require('firebase-functions');
const express = require('express');

// This is our local code
import FirebaseBackend from 'firebase-backend';

var admin = require('firebase-admin');
var app = admin.initializeApp();
let backend = new FirebaseBackend(app);

exports.processRequest = functions.database
  .ref('/request/{requestId}')
  .onUpdate((snapshot) => {
    console.log('1');
  });

exports.date = functions.https.onRequest((req, res) => {
  res.send('Hello world');
  res.end();
});
