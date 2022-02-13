import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import twitterSvg from '../public/svg/twitter.svg';
import githubSvg from '../public/svg/github.svg';
import facebookSvg from '../public/svg/facebook.svg';
import heroImg from '../public/images/hero.jpg';
import { Hero } from '../components/hero';
import { getStaticProps as getArchiveStatiProps, Props, Docs } from './archive/index';
import { HeadForSEO } from '../components/seo';
import { getFullUrl } from '../utils/url';

const Icon = ({ src, href }: { src: string; href: string }) => {
  return (
    <Link href={href}>
      <a>
        <Image alt="icon" src={src} width="24" height="24" data-icon />
      </a>
    </Link>
  );
};
const Home = (props: Props & { hasMore: boolean }) => {
  return (
    <div>
      <HeadForSEO
        title="Ryosuke Suzuki"
        description="Hello! I'm ryosuke suzuki, a software engineer in Tokyo."
        type="website"
        url={`${getFullUrl('/')}`}
        imageUrl={getFullUrl('/images/ogp-default.png')}
        width={1000}
        height={508}
      />
      <Hero
        src={heroImg}
        alt="Me at Fusimi Inari, Kyoto"
        loading="lazy"
        filter
      />
      <h1 data-title>Hello!</h1>
      <p>Ryosuke Suzuki, a software engineer in Tokyo, preferring to work at a startup, enjoying singing, born in 1996.</p>

      <h4>Recently</h4>
      <Docs docs={props.docs}/>
      {props.hasMore && <p><Link href="/archive">
        <a data-menu>... more</a>
      </Link></p>}
      <br />
      <div className={styles.links}>
        <Icon src={twitterSvg} href="https://twitter.com/GentleClarinet" />
        <Icon src={githubSvg} href="https://github.com/RyosukeCla" />
        <Icon src={facebookSvg} href="https://www.facebook.com/ryosuke0907" />
      </div>

    </div>
  );
};

export async function getStaticProps() {
  const data = await getArchiveStatiProps();
  const MAX = 5;
  return {
    props: {
      docs: data.props.docs.slice(0, MAX),
      hasMore: data.props.docs.length > MAX,
    }
  }
}

export default Home;
