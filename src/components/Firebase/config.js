let config = null;

if (process.env.REACT_APP_HOST_ENV === 'production') {
  config = {
    apiKey: 'AIzaSyBtHRUSPc0e4rF057rotTeVpeZ3lDWoQTE',
    authDomain: 'hospitalcommunity.firebaseapp.com',
    databaseURL: 'https://hospitalcommunity.firebaseio.com',
    projectId: 'hospitalcommunity',
    storageBucket: 'hospitalcommunity.appspot.com',
    messagingSenderId: '726825294724',
    appId: '1:726825294724:web:f3dc998705fbe6c8b09bd1',
    measurementId: 'G-987WXEFK5D',
  };
} else {
  config = {
    apiKey: 'AIzaSyAXmpRfgvne_w2apeWb3Q8wSNUqNey3-Mg',
    authDomain: 'help-supply-staging.firebaseapp.com',
    databaseURL: 'https://help-supply-staging.firebaseio.com',
    projectId: 'help-supply-staging',
    storageBucket: 'help-supply-staging.appspot.com',
    messagingSenderId: '395198068697',
    appId: '1:395198068697:web:3a7975e877fbc98c190bc8',
    measurementId: 'G-5SYKT9JHQF',
  };
}

export default config;
