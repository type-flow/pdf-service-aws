import * as htmlPdf from 'html-pdf-chrome';
import * as path from 'path';
import fs from 'fs';

import { success } from './libs/response';
// import * as AWS from 'aws-sdk';

// const s3 = new AWS.S3();
const options = {
};

export async function generate(event, context, callback) {
 
  const pdfFilename = `${event.options.filename}.${event.options.filetype}`;
  const pdfPath = path.join(process.cwd(), 'pdf');

  if (!fs.existsSync(pdfPath)) {
    fs.mkdirSync(pdfPath, '0775');
  }
  
  try {

    htmlPdf.create(event.options.url, options)
      .then(pdf => pdf.toFile(path.join(pdfPath, 'd', pdfFilename)))
      .catch(reason => {
        throw new Error(reason)
      });

  } catch(error) {
    console.error(error);
  }
};
