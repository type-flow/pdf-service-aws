import Chromeless from "chromeless";

import { success, failure } from './libs/response.lib';


export function main(event, context, callback) {
    const c = new Chromeless();

    try {
      const place = c.goto(event.queryStringParameters.url)
        .wait(event.queryStringParameters.selector || "body")
        .screenshot(event.queryStringParameters.selector || "body");

      callback(null, success(place));
    } catch( e ) {
      callback(null, failure({
        status: false,
        error: `Couldn\'t create screenshot`,
        debug: { stackTrace: e, params: event.queryStringParameters }
      }));
    }
}


// export async function generate(event, context, callback) {

//   if(!event.options || !event.options.url) {
//     console.error('No options provided for PDF creation');
//     return callback(new Error('Couldn\'t create the todo item.'));
//   }
 

//   // remote: {
//   //   endpointUrl: 'https://XXXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev',
//   //   apiKey: 'your-api-key-here',
//   // };
//   // const pdfFilename = `${event.options.filename}.${event.options.filetype}`;

//   const chromeless = new Chromeless({ remote: true })
//   const pdf = await chromeless
//     .goto(event.options.url)
//     .pdf({
//       landscape: false,
//       displayHeaderFooter: false,
//       printBackground: false,
//       scale: 1,
//       paperWidth: 8.27,
//       paperHeight: 11.69,
//       marginTop: 0,
//       marginBottom: 0,
//       marginLeft: 0,
//       marginRight: 0
//   })

//   console.log(pdf) // prints local file path or S3 URL

//   await chromeless.end();

//   callback(null, success({"pdf": pdf}));
// };