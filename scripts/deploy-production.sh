#! /bin/sh

# set the hosting environment
export REACT_APP_HOST_ENV=production

# set firebase project type
firebase use production

# install dependencies
yarn

# do a production build
yarn build

# move to functions directory
cd functions

# install functions dependencies
npm install

# move to root level
cd ../

# deploy to firebase staging
firebase deploy