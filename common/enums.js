
export const RoleCode = {
    APP: "APP",
    USER: "USER",
    ADMIN: 'ADMIN',
    SELLER: 'SELLER',
    SUPPLIER: "SUPPLIER",
    MERCHANT: "MERCHANT",
    DISPATCH: 'DISPATCH',
    SUPER_ADMIN: "SUPER_ADMIN",
    CUSTOMER_SERVICE: "CUSTOMER_SERVICE",
}

export const ErrorType = {
    BAD_TOKEN: 'BadTokenError',
    TOKEN_EXPIRED: 'TokenExpiredError',
    UNAUTHORIZED: 'AuthFailureError',
    ACCESS_TOKEN: 'AccessTokenError',
    INTERNAL: 'InternalError',
    NOT_FOUND: 'NotFoundError',
    NO_ENTRY: 'NoEntryError',
    NO_DATA: 'NoDataError',
    BAD_REQUEST: 'BadRequestError',
    FORBIDDEN: 'ForbiddenError',
}

export const StatusCode = {
    SUCCESS: '10000',
    FAILURE: '10001',
    RETRY: '10002',
    INVALID_ACCESS_TOKEN: '10003',
}

export const ResponseStatus = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

export const ValidationSource = {
    BODY: 'body',
    HEADER: 'headers',
    QUERY: 'query',
    PARAM: 'params'
}

export const UrlType = {
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO'
}