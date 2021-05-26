import firebase from 'firebase';

const firebaseConfig = {
   apiKey: 'AIzaSyBgAijqB674Fg8rKWEmzGLA28SnHEBLwUo',
   authDomain: 'boong-intern.firebaseapp.com',
   databaseURL: 'https://boong-intern-default-rtdb.firebaseio.com',
   projectId: 'boong-intern',
   storageBucket: 'boong-intern.appspot.com',
   messagingSenderId: '326962618225',
   appId: '1:326962618225:web:1189393d6fc2004381e0d0',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
