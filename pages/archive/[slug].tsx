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
import Link from 'next/link';
import { generateOgpImage, Ogp } from '../../utils/generate-image';
import { HeadForSEO } from '../../components/seo';
import { getFullUrl } from '../../utils/url';

export const DOC_FILE_PATH = path.join(process.cwd(), './archives/');
export const DOC_FILE_PATHS = fs
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
  img: Image
}

type PageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: {
    slug: string;
    title: string;
    pubtime: string;
    hero: StaticImageData;
    ogp: Ogp;
    description: string;
  }
}
export default function Page({ source, frontMatter }: PageProps) {
  useEffect(() => {
    const init = async () => {
      await import('prismjs/components/prism-typescript' as string);
      await import('prismjs/components/prism-yaml' as string);
      await import('prismjs/components/prism-json' as string);
      await import('prismjs/components/prism-bash' as string);
      Prism.highlightAll();
    }
    init();
  }, []);
  return (
    <div>
      <HeadForSEO
        title={`${frontMatter.title} | Ryosuke Suzuki`}
        description={frontMatter.description}
        type="article"
        imageUrl={getFullUrl(frontMatter.ogp.url)}
        width={frontMatter.ogp.width}
        height={frontMatter.ogp.height}
        url={getFullUrl(`/archive/${frontMatter.slug}`)}
      />
      {
        frontMatter.hero && <Hero
          src={frontMatter.hero}
          alt={frontMatter.title}
          loading="lazy"
          filter
        />
      }
      <h1 data-title>
        <div className={styles.goback}>
          <Link href="/archive"><a><small>cd ../</small></a></Link>
        </div>
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

  const ogp = await generateOgpImage({
    title: data.title,
    pubtime: data.pubtime.toISOString(),
  });

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
        slug: params.slug,
        title: data.title,
        pubtime: data.pubtime.toISOString(),
        hero: data.hero || '',
        ogp: ogp,
        description: content.trim().substring(0, 180).replace(/\n/gm, ' '),
      },
    },
  }
}

export const getStaticPaths = async () => {
  const paths = DOC_FILE_PATHS
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  }
}