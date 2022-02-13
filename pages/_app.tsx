import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import { HeadForSEO } from '../components/seo';
import { getFullUrl } from '../utils/url';
import Script from 'next/script'

export function reportWebVitals({ id, name, label, value }: any) {
  (window as any).gtag("send", "event", {
    eventCategory: `${label} metric`,
    eventAction: name,
    eventValue: Math.round(name === "CLS" ? value * 1000 : value),
    eventLabel: id,
    nonInteraction: true,
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PQXG77P4B2" />
      <Script id="ga" defer strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-PQXG77P4B2');
        `}
      </Script>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/">
            <a data-header>Ryosuke Suzuki</a>
          </Link>
          <div className={styles.space} />
          <Link href="/">
            <a data-menu>Hello</a>
          </Link>
          <Link href="/archive">
            <a data-menu>Archive</a>
          </Link>
        </header>
        <div className={styles.body}>
          <Component {...pageProps} />
        </div>
        <footer className={styles.footer}>
          <small>Ⓒ Ryosuke Suzuki</small>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
