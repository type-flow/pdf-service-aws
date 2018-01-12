import * as htmlPdf from 'html-pdf-chrome';
import * as path from 'path';
import fs from 'fs';

import { success, failure } from './libs/response';
// import * as AWS from 'aws-sdk';

// const s3 = new AWS.S3();
const options = {
};

export async function generate(event, context, callback) {

  if(!event.options || !event.options.url) {
    console.error('No options provided for PDF creation');
    return callback(new Error('Couldn\'t create the todo item.'));
  }
 
  const pdfFilename = `${event.options.filename}.${event.options.filetype}`;
  const pdfPath = path.join(process.cwd(), 'pdf');

  if (!fs.existsSync(pdfPath)) {
    fs.mkdirSync(pdfPath, '0775');
  }

  const file = path.join(pdfPath, pdfFilename);
  
  await htmlPdf.create(event.options.url, options)
    .then(pdf => pdf.toFile(file))
    .catch(error => {
      console.error(error);
      return callback(new Error('Couldn\'t generate the PDF.'));
    });

    callback(null, success({"pdf": file}));
};
