import admin from "firebase-admin";
import { readFile } from "fs/promises";

// Read service account key
const serviceAccount = JSON.parse(
  await readFile(new URL("../serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db };
