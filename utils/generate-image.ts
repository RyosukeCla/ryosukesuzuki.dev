import NodeHtmlToImage from 'node-html-to-image';
import fs from 'fs';
import path from 'path';
import { formatDate } from './format-date';

const PUBLIC_DIR = path.join(process.cwd(), './public');
const FONTS_PATH = path.join(process.cwd(), './public/fonts');
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'ogp');
const outfitSemiBold = fs.readFileSync(path.resolve(FONTS_PATH, './Outfit-SemiBold.ttf')).toString('base64');
fs.mkdirSync(OUTPUT_PATH, { recursive: true });

const STYLE = `
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: bold;
  src: url(data:application/x-font-ttf;charset=utf-8;base64,${outfitSemiBold}) format('truetype');
}
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: normal;
  src: url(data:application/x-font-ttf;charset=utf-8;base64,${outfitSemiBold}) format('truetype');
}
body {
  background: #FFF;
  height: 314px;
  width: 600px;
  display: flex;
  align-items: center;
  font-family: 'Outfit';
}
.container {
  margin: 0 32px;
}
h1 {
  font-size: 32px;
  color: rgb(42, 42, 42);
  line-height: 1.3;
  margin: 0;
}
small {
  font-size: 14px;
  font-weight: bold;
  color: #6b6b6b;
}
`

export type Ogp = {
  width: number,
  height: number,
  url: string;
}
export async function generateOgpImage(args: { title: string, pubtime: string }): Promise<Ogp> {
  const time = new Date(args.pubtime).getTime();
  const fileName = `${time}.jpg`;
  const outputPath = path.resolve(OUTPUT_PATH, fileName);
  if (!fs.existsSync(outputPath)) {
    await NodeHtmlToImage({
      output: outputPath,
      selector: 'body',
      html: `
  <html>
    <body>
      <style>
        ${STYLE}
      </style>
      <div class="container">
        <h1>${args.title}</h1>
        <small>${formatDate(args.pubtime)}</small>
      </div>
    </body>
  </html>`
    });
    console.log('generated ogp image', outputPath);
  };
  return {
    width: 600,
    height: 314,
    url: `/ogp/${fileName}`,
  }
}

