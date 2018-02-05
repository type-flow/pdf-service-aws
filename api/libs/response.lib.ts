import { IResponse } from '../interfaces/aws.interface';

interface IResponseErrorObject {
  status: boolean;
  error?: String;
  debug?: any;
}

export function success(body: Object) {
  return buildResponse(200, body);
}

export function failure(body: IResponseErrorObject) {
  return buildResponse(500, body);
}

function buildResponse(statusCode: number, body: Object): IResponse {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
}
