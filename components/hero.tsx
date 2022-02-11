
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export const Hero = ({ src, alt, loading='eager', filter }: { src: string | StaticImageData; alt: string; loading?: 'eager' | 'lazy', filter?: boolean }) => {
  return <div className={styles.hero} data-filter={filter}>
    <Image
      src={src}
      layout="fill"
      loading={loading}
      alt={alt}
    />
  </div>
}
