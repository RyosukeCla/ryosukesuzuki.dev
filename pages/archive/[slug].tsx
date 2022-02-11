import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head';
import path from 'path';
import styles from '../../styles/Archive.module.css';
import { formatDate } from '../../utils/format-date';

const DOC_FILE_PATH = path.join(process.cwd(), './archives/');
const DOC_FILE_PATHS = fs
  .readdirSync(DOC_FILE_PATH)
  .filter((path) => /\.mdx?$/.test(path));

const MD_COMPONENTS = {
  Head,
}

type PageProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: {
    title: string;
    pubtime: string;
  }
}
export default function Page({ source, frontMatter }: PageProps) {
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
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