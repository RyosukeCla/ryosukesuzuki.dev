import fs from 'fs';
import path from 'path';
import * as matter from 'gray-matter';
import Link from 'next/link';
import styles from '../../styles/Archive.module.css';
import { formatDate } from '../../utils/format-date';
import { HeadForSEO } from '../../components/seo';
import { getFullUrl } from '../../utils/url';

const DOC_FILE_PATH = path.join(process.cwd(), './archives/');
const DOC_FILE_PATHS = fs
  .readdirSync(DOC_FILE_PATH)
  .filter((path) => /\.mdx?$/.test(path)).reverse();

export const Docs = ({ docs }: { docs: Doc[] }) => {
  return <div className={styles.list}>
    {docs.map((doc, key) => {
      return <Link key={key} href={`/archive/${doc.slug}`}>
        <a className={styles.listitem}>
          <span>{doc.title}</span>
          <div className={styles.datetime}>
            <small>{formatDate(doc.pubtime)}</small>
          </div>
        </a>
      </Link>
    })}
  </div>
}
type Doc = { title: string; pubtime: string, slug: string };
export type Props = {
  docs: Doc[];
}
export default function ArchiveListPage({ docs }: Props) {
  return (
    <div>
      <HeadForSEO
        title="Archive | Ryosuke Suzuki"
        description="Here, my archives are placed."
        type="website"
        url={`${getFullUrl('/archive')}`}
        imageUrl={getFullUrl('/images/ogp-default.png')}
        width={1000}
        height={508}
      />
      <h1 data-title>Archive</h1>
      <Docs docs={docs} />
    </div>
  )
}

export async function getStaticProps() {
  const docs = DOC_FILE_PATHS.map(docFilePath => {
    const { data } = matter.read(path.resolve(DOC_FILE_PATH, docFilePath));
    const { title, pubtime } = data;
    const slug = docFilePath.replace(/\.mdx?$/, '');
    return {
      title,
      pubtime: pubtime.toISOString(),
      slug,
    }
  });
  return {
    props: {
      docs,
    },
  }
}