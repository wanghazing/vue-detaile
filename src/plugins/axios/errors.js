import httpCodeError from "./httpCodeError";

// 客户端错误
export class ClientError extends Error {
  constructor(props) {
    super(props.message);
    this.name = "ClientError";
  }
}

// 网络错误
export class HttpError extends Error {
  constructor(props) {
    super(httpCodeError[props.httpCode] || "未知错误");
    this.name = "HttpError";
    this.httpCode = props.httpCode;
  }
}

// 业务错误
export class BuessinessError extends Error {
  constructor(props) {
    super(props.message);
    this.name = "BuessinessError";
    this.uri = props.uri;
  }
}
