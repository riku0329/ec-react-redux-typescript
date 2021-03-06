import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDrNqVAklGxigGS7-me7JREsS_dyD81PMc',
  authDomain: 'infaste-app.firebaseapp.com',
  databaseURL: 'https://infaste-app.firebaseio.com',
  projectId: 'infaste-app',
  storageBucket: 'infaste-app.appspot.com',
  messagingSenderId: '156589907879',
  appId: '1:156589907879:web:bb859257e3ba3c3b2b6082',
  measurementId: 'G-2QWKNQJNEG',
};

firebase.initializeApp(config);

export const createUserDocument = async (userAuth: any, addData?: any) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = firebaseTimestamp;
    const role_id: number = 2;
    try {
      await userRef.set({
        email,
        createdAt,
        role_id,
        ...addData,
      });
    } catch (error) {
      console.log('ユーザーの作成に失敗しました');
    }
  }
  return userRef;
};

export const saveCollection = async (
  gender: string,
  name: string,
  description: string,
  category: string,
  place: string
) => {
  const collectionRef = firestore.collection('collections').doc();
  const createdAt = firebaseTimestamp;
  const data = {
    gender: gender,
    name: name,
    description: description,
    category: category,
    place: place,
    createdAt: createdAt,
  };
  try {
    return await collectionRef.set(data);
  } catch (error) {
    console.log('error was collection');
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const firebaseTimestamp = firebase.firestore.Timestamp.now();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
