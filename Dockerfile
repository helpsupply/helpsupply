FROM node:buster
RUN npm install -g firebase-tools
RUN firebase setup:emulators:firestore

RUN apt-get update
RUN apt-get install -y default-jre

COPY firebase.json .
CMD firebase emulators:start --only firestore

