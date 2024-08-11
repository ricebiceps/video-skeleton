'use client';

import { useSearchParams } from 'next/navigation';

export default function Watch() {
    const videoPrefix = 'https://storage.cloud.google.com/service-processed-videos/';
    const videoSrc = useSearchParams().get('v');
    const videoUrl = videoSrc ? `${videoPrefix}${encodeURIComponent(videoSrc)}` : '';

    return (
        <div>
            <h1>Watch page</h1>
            {videoUrl ? (
                <video controls src={videoUrl} style={{ width: '50%' }} />
            ) : (
                <p>Video not found</p>
            )}
        </div>
    );
}
