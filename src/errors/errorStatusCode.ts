import statusCode from "../utils/statusCodeUtils.js";

export enum StatusCodes {
  BadRequest = statusCode.BAD_REQUEST,
  Unauthorized = statusCode.UNAUTHORIZED,
  Forbidden = statusCode.FORBIDDEN,
  NotFound = statusCode.NOT_FOUND,
  UnprocessableEntity = statusCode.UNPROCESSABLE_ENTITY,
  InternalServerError = statusCode.INTERNAL_SERVER_ERROR,
}
