export interface IResponse {
  statusCode: number;
  body: any;
  headers?: {[key: string]: Headervalue};
}

type Headervalue = any;
