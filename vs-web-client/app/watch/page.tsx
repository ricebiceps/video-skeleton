'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function VideoPlayer() {
    const videoPrefix = 'https://storage.cloud.google.com/service-processed-videos/';
    const videoSrc = useSearchParams().get('v');
    const videoUrl = videoSrc ? `${videoPrefix}${encodeURIComponent(videoSrc)}` : '';

    return (
        <div>
            {videoUrl ? (
                <video controls src={videoUrl} style={{ width: '50%' }} />
            ) : (
                <p>Video not found</p>
            )}
        </div>
    );
}

export default function Watch() {
    return (
        <div>
            <h1>Watch page</h1>
            <Suspense fallback={<p>Loading video...</p>}>
                <VideoPlayer />
            </Suspense>
        </div>
    );
}
