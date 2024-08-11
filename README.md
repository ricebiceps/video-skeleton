# Video Processing and Streaming Platform

This project is a cloud-based video processing and streaming platform that utilizes various Google Cloud services to process, store, and serve videos through a web interface. The platform is designed to handle raw video uploads, process them using a serverless service, and then serve them to users through a web client built with Next.js.

## Features

- **Cloud Storage**: 
  - Stores both raw and processed videos uploaded by users.
  - Raw videos are processed into a standard format before being served to users.

- **Pub/Sub**:
  - Acts as a messaging service to trigger video processing tasks.
  - Sends messages to the video processing service to start transcoding videos.

- **Cloud Run**:
  - Hosts a non-public video processing service.
  - This service transcodes videos and uploads the processed versions back to Cloud Storage.
  - Also hosts the Next.js app, which serves as the frontend web client (similar to a simplified YouTube).

- **Cloud Firestore**:
  - Stores metadata for each video, including its processing status, file locations, and other relevant information.
  - Acts as the main database for the platform.

- **Next.js App**:
  - A web client hosted on Cloud Run.
  - Allows users to upload videos, browse video content, and view processed videos.
  - Integrates with Firebase Functions to retrieve video data and serve it to users.

- **Firebase Functions**:
  - Provides backend API endpoints for the Next.js app.
  - Fetches video metadata from Cloud Firestore and returns it to the web client for display.

## Architecture Overview

1. **User Uploads Video**:
   - Users upload raw video files through the Next.js web client.

2. **Video Storage**:
   - Raw videos are stored in a designated Cloud Storage bucket.

3. **Pub/Sub Notification**:
   - A Pub/Sub message is triggered once a video is uploaded, notifying the video processing service to start the transcoding process.

4. **Video Processing**:
   - The video processing service, hosted on Cloud Run, receives the Pub/Sub message.
   - It downloads the raw video from Cloud Storage, transcodes it, and uploads the processed video back to a different Cloud Storage bucket.

5. **Metadata Storage**:
   - Metadata about the video, such as its processing status and file locations, is stored in Cloud Firestore.

6. **Video Playback**:
   - Users can browse and view videos through the Next.js web client.
   - The web client fetches video data from Cloud Firestore using Firebase Functions and streams the processed video files from Cloud Storage.

## Prerequisites

- Node.js (version 14 or higher)
- Google Cloud SDK
- Firebase CLI

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Google Cloud Services**:
    - Create the necessary Google Cloud services: Cloud Storage, Cloud Firestore, Cloud Pub/Sub, Cloud Run, and Firebase. 
    - Configure your Firebase project and enable Cloud Functions.

4. Deploy the Next.js App to Cloud Run:
    ```bash
    npm run build
    gcloud run deploy --source .
    ```

5. Deploy Firebase Functions:
    ```
    firebase deploy --only functions
    ```

6. Configure CORS for Cloud Storage:
    - Ensure that the correct CORS settings are applied to the Cloud Storage buckets to allow video playback in the browser.

## Usage
1. Upload Videos:
    - Use the Next.js web client to upload raw videos.

2. View Processed Videos:
    - The processed videos will be available in the web client after uploading.

3. Monitor Processing:
    - Through firestore, the process status is abled to be monitored.

## Next Steps
Here are some of features I hope to implement in the future: 
1. Add user profile pictures and email on web client
2. Allow users to set thumbnails on videos
3. Allow users to add title and descriptions on their videos
4. Implement subscriptions 
... and more