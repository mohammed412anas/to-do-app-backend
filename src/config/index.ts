import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();
export default db;
