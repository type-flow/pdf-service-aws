import * as path from 'path';
import fs from 'fs';
import { Chromeless } from 'chromeless';

import { success, failure } from './libs/response';

export async function generate(event, context, callback) {

  if(!event.options || !event.options.url) {
    console.error('No options provided for PDF creation');
    return callback(new Error('Couldn\'t create the todo item.'));
  }
 
  // const pdfFilename = `${event.options.filename}.${event.options.filetype}`;

  const chromeless = new Chromeless({ remote: true })
  const pdf = await chromeless
    .goto(event.options.url)
    .pdf({
      landscape: false,
      displayHeaderFooter: false,
      printBackground: false,
      scale: 1,
      paperWidth: 8.27,
      paperHeight: 11.69,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
  })

  console.log(pdf) // prints local file path or S3 URL

  await chromeless.end()
    callback(null, success({"pdf": pdf}));
};