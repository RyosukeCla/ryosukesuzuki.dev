import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head';
import NextImage from 'next/image';
import path from 'path';
import styles from '../../styles/Archive.module.css';
import { formatDate } from '../../utils/format-date';
import { useEffect } from 'react';
import Prism from 'prismjs';
import { Hero } from '../../components/hero';

const DOC_FILE_PATH = path.join(process.cwd(), './archives/');
const DOC_FILE_PATHS = fs
  .readdirSync(DOC_FILE_PATH)
  .filter((path) => /\.mdx?$/.test(path));

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return <span className={styles.image}>
    <NextImage
      src={src}
      alt={alt}
      layout="fill"
      loading="lazy"
    />
  </span>
}

const MD_COMPONENTS = {
  Head,
  img: Image
}

type PageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: {
    title: string;
    pubtime: string;
    hero: StaticImageData;
  }
}
export default function Page({ source, frontMatter }: PageProps) {
  useEffect(() => {
    const init = async () => {
      await import('prismjs/components/prism-typescript' as string);
      await import('prismjs/components/prism-yaml' as string);
      await import('prismjs/components/prism-json' as string);
      Prism.highlightAll();
    }
    init();
  }, []);
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      {
        frontMatter.hero && <Hero
          src={frontMatter.hero}
          alt={frontMatter.title}
          loading="lazy"
          filter
        />
      }
      <h1 data-title>
        {frontMatter.title}
        <div className={styles.datetime}>
          <small>{formatDate(frontMatter.pubtime)}</small>
        </div>
      </h1>
      <MDXRemote {...source} components={MD_COMPONENTS} />
    </div>
  )
}

export const getStaticProps = async ({ params }: { params: { slug: string }}) => {
  const docFilePath = path.join(DOC_FILE_PATH, `${params.slug}.md`);
  const source = fs.readFileSync(docFilePath);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: {},
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: {
        title: data.title,
        pubtime: data.pubtime.toISOString(),
        hero: data.hero || '',
      },
    },
  }
}

export const getStaticPaths = async () => {
  const paths = DOC_FILE_PATHS
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}