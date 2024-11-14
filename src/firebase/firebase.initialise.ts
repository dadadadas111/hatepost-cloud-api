import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

// read the service account key from the file system
let serviceAccount: any;
try {
  // check if file exists
  fs.accessSync('.firebase-creds/firebase.json', fs.constants.F_OK);
  serviceAccount = JSON.parse(
    fs.readFileSync('.firebase-creds/firebase.json', 'utf8'),
  );
} catch (error) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
}

if (!serviceAccount) {
  throw new Error('Firebase service account key is not provided');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAdmin = admin;
