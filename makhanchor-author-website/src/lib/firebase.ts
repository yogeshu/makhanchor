import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, Timestamp, Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore (handling custom databaseId if configured)
let db: Firestore;
try {
  if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)') {
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  } else {
    db = getFirestore(app);
  }
} catch (e) {
  console.warn('Falling back to default Firestore database instance:', e);
  db = getFirestore(app);
}

export { db };

// Interfaces
export interface LetterPayload {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface GuestbookPayload {
  authorName: string;
  location?: string;
  comment: string;
  rating?: number;
  createdAt: string;
}

export interface SubscriberPayload {
  email: string;
  subscribedAt: string;
}

/**
 * Save a new letter submission to Firestore 'letters' collection
 */
export async function saveLetterToFirebase(letter: Omit<LetterPayload, 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'letters'), {
      ...letter,
      createdAt: new Date().toISOString(),
      timestamp: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving letter to Firestore:', error);
    throw error;
  }
}

/**
 * Save a newsletter subscriber to Firestore 'subscribers' collection
 */
export async function saveSubscriberToFirebase(email: string) {
  try {
    const docRef = await addDoc(collection(db, 'subscribers'), {
      email,
      subscribedAt: new Date().toISOString(),
      timestamp: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving subscriber to Firestore:', error);
    throw error;
  }
}

/**
 * Save guestbook reflection to Firestore 'guestbook' collection
 */
export async function saveGuestbookToFirebase(entry: Omit<GuestbookPayload, 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'guestbook'), {
      ...entry,
      createdAt: new Date().toISOString(),
      timestamp: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving guestbook entry to Firestore:', error);
    throw error;
  }
}

/**
 * Fetch recent guestbook entries from Firestore
 */
export async function fetchGuestbookFromFirebase() {
  try {
    const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
    const entries: GuestbookPayload[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        authorName: data.authorName || 'Anonymous Reader',
        location: data.location || '',
        comment: data.comment || '',
        rating: data.rating || 5,
        createdAt: data.createdAt || new Date().toISOString()
      });
    });
    return entries;
  } catch (error) {
    console.warn('Could not fetch guestbook from Firestore:', error);
    return [];
  }
}
