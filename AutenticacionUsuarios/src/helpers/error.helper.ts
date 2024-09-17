const conflictError = (msg: string, code = 'CONFLICT') => {
  let err: any = new Error();
  err.code = code;
  err.httpStatus = 409;
  err.message = msg;
  throw err;
};

const notFoundError = (msg: string, code = 'NOT_FOUND') => {
  let err: any = new Error();
  err.code = code;
  err.httpStatus = 404;
  err.message = msg;
  throw err;
};

const notAuthorizedError = (msg: string, code = 'UNAUTHORIZED') => {
  let err: any = new Error();
  err.code = code;
  err.httpStatus = 401;
  err.message = msg;
  throw err;
};

const forbiddenError = (msg: string, code = 'FORBIDDEN') => {
  let err: any = new Error();
  err.code = code;
  err.httpStatus = 403;
  err.message = msg;
  throw err;
};

const internalServerError = (msg: string, code = 'INTERNAL_ERROR') => {
  let err: any = new Error();
  err.code = code;
  err.httpStatus = 500;
  err.message = msg;
  throw err;
};

const badRequestError = (msg: string, code = 'BAD_REQUEST_ERROR') => {
  let err: any = new Error();
  err.code = code;
  err.httpStatus = 400;
  err.message = msg;
  throw err;
};

export default {
  conflictError,
  notFoundError,
  notAuthorizedError,
  forbiddenError,
  internalServerError,
  badRequestError,
};
