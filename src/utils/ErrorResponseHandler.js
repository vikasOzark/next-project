import { NextResponse } from "next/server";
import httpStatus from "./httpStatus";

/**
 *
 * @param {Error} error Error object
 * @param {Map} extras pass additional such as statusCode or custom_message in dict
 * @returns
 */
const ErrorResponseHandler = (error, extras) => {
  const {
    statusCode = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR,
    custom_message = null,
  } = extras;

  const errorMessage = error.message.split(":");
  let message = null;

  if (!custom_message) {
    if (errorMessage[0] === "self") {
      message = errorMessage[1];
    } else {
      message = "Something went wrong.";
    }
  } else {
    message = custom_message;
  }

  return NextResponse.json(
    {
      message: message,
      success: false,
      data: [],
      error: error,
    },
    { status: statusCode }
  );
};

/**
 *
 * @param {Error} error Error object
 * @param {Map} extras pass additional such as statusCode or custom_message in dict
 * @returns
 */
export const ErrorResponse = (
  config,
  statusCode = httpStatus.HTTP_500_INTERNAL_SERVER_ERROR
) => {
  const {
    message = "Something bad happend, Please try again later.",
    error = null,
  } = config;

  return NextResponse.json(
    {
      message: message,
      success: false,
      data: [],
      error: error,
    },
    { status: statusCode }
  );
};

export default ErrorResponseHandler;
