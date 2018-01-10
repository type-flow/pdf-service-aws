import { Handler, Context, Callback } from 'aws-lambda';
// import fetch from 'node-fetch';
// import * as htmlPdf from 'html-pdf-chrome'
// import * as AWS from 'aws-sdk';

// const s3 = new AWS.S3();
// const options: htmlPdf.CreateOptions = {
//   port: 9222, // port Chrome is listening on
// };

interface HelloResponse {
  statusCode: number;
  body: string;
}

const hello: Handler = (event: any, context: Context, callback: Callback) => {
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: Math.floor(Math.random() * 10)
    })
  };

  callback(undefined, response);

  // const url = 'https://github.com/westy92/html-pdf-chrome';
  // htmlPdf.create(url, options)
  //   .then((pdf) => pdf.toBuffer());

  /*
  fetch(event.image_url)
    .then((response: any) => {
      if (response.ok) {
        return response;
      }

      return Promise.reject(
        new Error(`Failed to fetch ${response.url}: ${response.status} ${response.statusText}`)
      );
    })
    .then((response: any) => response.buffer())
    .then((buffer: Buffer) => (
      s3.putObject({
        Bucket: process.env.BUCKET,
        Key: event.key,
        Body: buffer,
      }).promise()
    ))
    .then((v: any) => callback(null, v), callback);
    */
};

export { hello }