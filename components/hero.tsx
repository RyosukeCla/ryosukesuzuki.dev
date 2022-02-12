
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export const Hero = ({ src, alt, loading='lazy', filter }: { src: string | StaticImageData; alt: string; loading?: 'eager' | 'lazy', filter?: boolean }) => {
  return <div className={styles.hero} data-filter={filter}>
    <Image
      src={src}
      layout="fill"
      objectFit="cover"
      loading={loading}
      alt={alt}
    />
  </div>
}
