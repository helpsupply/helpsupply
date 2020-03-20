#!/bin/bash

firebase emulators:exec --only firestore 'node_modules/mocha/bin/mocha src/test/test.js'

# (without firebase emulators) node_modules/mocha/bin/mocha src/test/test.js
