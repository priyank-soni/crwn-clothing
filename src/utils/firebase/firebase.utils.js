import { initializeApp } from 'firebase/app';
import { getAuth,signInWithRedirect,
  signInWithPopup,GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
 } from 'firebase/auth';
import { getFirestore, doc,getDoc,setDoc,collection,writeBatch,query,getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3Sl6JdVQk44pcVujx3VG-ITTmBrUM1aY",
    authDomain: "crwn-clothing-db-af9ae.firebaseapp.com",
    projectId: "crwn-clothing-db-af9ae",
    storageBucket: "crwn-clothing-db-af9ae.appspot.com",
    messagingSenderId: "795261308930",
    appId: "1:795261308930:web:89e8e0bf0011f8f987d71b"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopUp = () => signInWithPopup(auth,provider);

  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

  export const db = getFirestore();

  export const addCollectionsAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(element => {
      const docRef = doc(collectionRef,element.title.toLowerCase());
      batch.set(docRef,element);
    });

    await batch.commit();
  }

  export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists())
    {
        const {displayName,email} = userAuth;
        const createdDate = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,email,createdDate,...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user',error);
        }

    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
  }

  export const signOutUser = async () => signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

  export const getCategoriesAndDocuments = async () => {

    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);

    const categoryMap = querySnapShot.docs.reduce((acc,docSnapShot) => {
      const {title, items} = docSnapShot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },{});

    return categoryMap;
  }