import { Context, Callback } from 'aws-lambda';
import { Chromeless } from 'chromeless';
import { success, failure } from './libs/response.lib';

import { IPdfOptions } from './interfaces/pdf.interface';


export async function main(event: any, context: Context, callback: Callback) {

  const pdfOptions: IPdfOptions = {
    landscape: false,
    displayHeaderFooter: false,
    printBackground: false,
    scale: 1,
    paperWidth: 8.27, // 210mm DIN A4
    paperHeight: 11.69, // 297mm
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0  
  }

  const chromeless = new Chromeless({
    remote: {
      endpointUrl: 'https://neqq4t4bvf.execute-api.eu-west-1.amazonaws.com/dev/generate',
      apiKey: 'jADd06KFfXkU8uDgiLRl2bdfIhx5ZuPUIEIMde00'
    }
  });

  try {
    const screenshot = await chromeless
      .goto('http://www.lukasholzer.com')
      .pdf(pdfOptions);

    callback(null, success(screenshot));
  } catch( e ) {
    callback(null, failure({
      status: false,
      error: `Couldn\'t create PDF`,
      debug: { stackTrace: e }
    }));
  }

    
  await chromeless.end();
}