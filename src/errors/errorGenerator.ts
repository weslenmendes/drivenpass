import { StatusCodes } from "./errorStatusCode.js";

export type typesOfError =
  | "BadRequestError"
  | "UnauthorizedError"
  | "NotFoundError"
  | "ForbiddenError"
  | "UnprocessableEntityError"
  | "InternalServerError";

type err = {
  type: typesOfError;
  message?: string;
};

interface errorDetails {
  statusCode: StatusCodes;
  message: string;
}

export function errorDetailsGenerator(err: any): errorDetails {
  const errorDetails = {
    BadRequestError: {
      statusCode: StatusCodes.BadRequest,
      message: err.message || "Bad Request",
    },
    UnauthorizedError: {
      statusCode: StatusCodes.Unauthorized,
      message: err.message || "Unauthorized",
    },
    ForbiddenError: {
      statusCode: StatusCodes.Forbidden,
      message: err.message || "Forbidden",
    },
    NotFoundError: {
      statusCode: StatusCodes.NotFound,
      message: err.message || "Not Found",
    },
    UnprocessableEntityError: {
      statusCode: StatusCodes.UnprocessableEntity,
      message: err.message || "Unprocessable Entity",
    },
    InternalServerError: {
      statusCode: StatusCodes.InternalServerError,
      message: err.message || "An internal error has occurred",
    },
  };

  return isDetailError(err)
    ? err
    : errorDetails[err.type] || errorDetails.InternalServerError;
}

export function generateError(err: err): errorDetails {
  return errorDetailsGenerator(err);
}

function isDetailError(err: any) {
  return err.statusCode && err.message;
}
