// Helper code for the API consumer to understand the error and handle it accordingly
import { StatusCode, ResponseStatus } from '../common/enums.js'

class ApiResponse {
  constructor(statusCode, status, message) { }

  prepare(res, response) {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  send(res) {
    return this.prepare(res, this);
  }

  static sanitize(response) {
    const clone = {};
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  url;

  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res) {
    this.url = res.req?.originalUrl;
    return super.prepare(res, this);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(message, data) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res) {
    res.setHeader('instruction', this.instruction);
    return super.prepare(res, this);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(message, accessToken, refreshToken) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res) {
    return super.prepare(res, this);
  }
}
