import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp({ credential: credential.applicationDefault() });

const firestore = new Firestore();
const videoCollectionId = 'videos';

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: 'processing' | 'processed',
  title?: string,
  description?: string  
}

async function getVideo(videoId: string) {
  console.log(`Fetching video with ID: ${videoId}`);
  const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
  const data = snapshot.data() as Video;
  console.log(`Fetched video data:`, data);
  return data ?? {};
}

export function setVideo(videoId: string, video: Video) {
  console.log(`Setting video with ID: ${videoId} and data:`, video);
  return firestore
    .collection(videoCollectionId)
    .doc(videoId)
    .set(video, { merge: true })
    .then(() => {
      console.log(`Successfully set video with ID: ${videoId}`);
    })
    .catch((error) => {
      console.error(`Error setting video with ID: ${videoId}`, error);
      throw error;
    });
}

export async function isVideoNew(videoId: string) {
  const video = await getVideo(videoId);
  const isNew = video?.status === undefined;
  console.log(`Is video new: ${isNew}`);
  return isNew;
}
