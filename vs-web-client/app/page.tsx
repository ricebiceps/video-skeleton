import Image from 'next/image';
import Link from 'next/link';
import styles from "./page.module.css";
import { getVideos } from "./firebase/functions"

export default async function Home() {
  const videos = await getVideos();

  return (
    <main className={styles.main}>
      {
        videos.map((video) => (
          <Link href={`/watch?v=${video.filename}`}>
            <Image src={'/thumbnail.jpg'} alt='video' width={120} height={80}
              className={styles.thumbnail}/>
          </Link>
        ))
      }
    </main>
  );
}
