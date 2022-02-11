import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import twitterSvg from '../public/svg/twitter.svg';
import githubSvg from '../public/svg/github.svg';
import facebookSvg from '../public/svg/facebook.svg';
import heroImg from '../public/images/hero.jpg';

const Icon = ({ src, href }: { src: string; href: string }) => {
  return <Link href={href}>
    <a>
      <Image
        alt="icon"
        src={src}
        width="20"
        data-icon
      />
    </a>
  </Link>
}
const Home: NextPage = () => {
  return (
    <div>
      <div className={styles.hero}>
        <Image
          src={heroImg}
          layout="fill"
          loading="eager"
          alt="Me at Fusimi Inari, Kyoto"
        />
      </div>
      <h1 data-title>Hello</h1>
      <p>
        I am Ryosuke Suzuki, a software engineer in Tokyo.
      </p>
      <div className={styles.links}>
        <Icon src={twitterSvg} href="https://twitter.com/GentleClarinet" />
        <Icon
          src={githubSvg}
          href="https://github.com/RyosukeCla"
        />
        <Icon
          src={facebookSvg}
          href="https://www.facebook.com/ryosuke0907"
        />
      </div>
    </div>
  )
}

export default Home
