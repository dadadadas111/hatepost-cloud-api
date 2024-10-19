import * as admin from 'firebase-admin';
import * as fs from 'fs';

// read the service account key from the file system
const serviceAccount = JSON.parse(
  fs.readFileSync('.firebase-creds/firebase.json', 'utf8'),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAdmin = admin;
