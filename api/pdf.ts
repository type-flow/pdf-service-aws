import { Context, Callback } from 'aws-lambda';
import * as htmlPdf from 'html-pdf-chrome'
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();
const options: htmlPdf.CreateOptions = {
  port: 9222, // port Chrome is listening on
};

export async function generate(event: any, context: Context, callback: Callback) {
 
  const filename = `${event.options.filename}.${event.options.filetype}`;

  htmlPdf.create(event.options.url, options)
    .then((pdf: htmlPdf.CreateResult) => {
       s3.putObject({
        Bucket: process.env.BUCKET,
        Key: filename,
        Body: pdf.toBuffer(),
      }).promise()
    })
    .then((v: any) => callback(null, v), callback);
    
};