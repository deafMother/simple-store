import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCS9T0pM8iHVoOh7hwzeQNXHrd9FaJZUw4',
  authDomain: 'clothing-store-c16e3.firebaseapp.com',
  databaseURL:
    'https://clothing-store-c16e3.firebaseio.com',
  projectId: 'clothing-store-c16e3',
  storageBucket: '',
  messagingSenderId: '270172253154',
  appId: '1:270172253154:web:59463df025a0aaafce27bb'
};

export const createUserProfileDocumnet = async (
  userAuth,
  additionalData
) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>
  auth.signInWithPopup(provider);

export default firebase;

//////////////////////////
