import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export const addFireStoreDocument = async (collectionName, newDocument) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), newDocument);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}
export const readAllFireStoreDocument = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        // let documentList = [];
        // querySnapshot.forEach((doc) => {
        //     documentList.push(doc.data());
        // });
        return (querySnapshot.docs.map((item) => ({id: item.id, ...item.data()})))
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}


export const uploadFile = async (filePath, file) => {
    try {
        const storageRef = ref(storage, filePath);
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file!');
        const downloadURL = getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        return downloadURL;
    } catch (e) {
        console.error("Error uploading image: ", e);
        throw e;
    }
}
