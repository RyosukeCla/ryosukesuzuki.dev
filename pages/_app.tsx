import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import styles from '../styles/Layout.module.css';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return <div className={styles.container}>
    <header className={styles.header}>
      <Link href="/"><a data-header>Ryosuke Suzuki</a></Link>
      <div className={styles.space} />
      <Link href="/"><a data-menu>About</a></Link>
      <Link href="/archive"><a data-menu>Archive</a></Link>
    </header>
    <Head>
      <title>Ryosuke Suzuki</title>
      <meta name="description" content="ryosuke suzuki" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.body}>
      <Component {...pageProps} />
    </div>
    <footer className={styles.footer}>
      <small>Ⓒ Ryosuke Suzuki</small>
    </footer>
  </div>
}

export default MyApp
