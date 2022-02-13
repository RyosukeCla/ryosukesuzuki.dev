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
      <meta name="viewport" content="width=device-width,initial-scale=1.0" key="viewport" />
      <meta name="description" content={description} key="description" />
      <meta property="og:url" content={props.url} key="og:url" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:site_name" content={title} key="og:site_name" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:type" content={props.type || 'website'} key="og:type" />
      {
        props.imageUrl && <>
          <meta property="og:image" content={props.imageUrl} key="og:image" />
          <meta property="og:image:width" content={String(width)} key="og:image:width" />
          <meta property="og:image:height" content={String(height)} key="og:image:height" />
        </>
      }
      <meta name="twitter:card" content={props.imageUrl ? "summary_large_image" : "summary"} key="og:twitter:card" />
      <meta name="twitter:site" content="@GentleClarinet" key="og:twitter:site" />
      <meta name="twitter:player" content="@GentleClarinet" key="og:twitter:player" />
      <link rel="preconnect" href="https://fonts.gstatic.com" key="preconnect" />
      <link rel="canonical" href={props.url} key="canonical" />
      <link rel="icon" href="/favicon.ico" key="icon" />
    </Head>
  )
}
