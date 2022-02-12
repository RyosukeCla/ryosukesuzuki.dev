import Head from 'next/head'

export type HeadForSEOProps = {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  width?: number;
  height?: number;
  type?: 'article' | 'website';
}
export const HeadForSEO = (props: HeadForSEOProps) => {
  const title = props.title || 'Ryosuke Suzuki';
  const description = props.description || "Hello! I'm a software engineer at Tokyo.";
  const width = props.width || 600;
  const height = props.height || 314;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={props.type || 'website'} />
      {
        props.imageUrl && <>
          <meta property="og:image" content={props.imageUrl} />
          <meta property="og:image:width" content={String(width)} />
          <meta property="og:image:height" content={String(height)} />
        </>
      }
      <meta name="twitter:card" content={props.imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:site" content="@GentleClarinet" />
      <meta name="twitter:player" content="@GentleClarinet" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="canonical" href={props.url} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
