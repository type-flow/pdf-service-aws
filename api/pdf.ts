import { Context, Callback } from 'aws-lambda';
import Chromeless from 'chromeless'
import { success, failure } from './libs/response.lib';


export async function main(event: any, context: Context, callback: Callback) {
    const chromeless = new Chromeless({
      remote: {
        endpointUrl: 'https://neqq4t4bvf.execute-api.eu-west-1.amazonaws.com/dev/generate',
        apiKey: 'jADd06KFfXkU8uDgiLRl2bdfIhx5ZuPUIEIMde00'
      }
    });

    try {
      const screenshot = await chromeless
        .goto('https://www.google.com')
        .type('chromeless', 'input[name="q"]')
        .screenshot();

      callback(null, success(screenshot));
    } catch( e ) {
      callback(null, failure({
        status: false,
        error: `Couldn\'t create screenshot`,
        debug: { stackTrace: e }
      }));
    }

    try {
      await chromeless.end()
    } catch(e) {

      callback(null, failure({
        status: false,
        error: `Couldn\'t stop Chromeless`,
        debug: { stackTrace: e }
      }));
    }
}