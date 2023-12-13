import { NextResponse } from "next/server";
import httpStatus from "./httpStatus";

const ErrorResponseHandler = (error) => {
   
  const errorMessage = error.message.split(":");
  let message = null;
  if (errorMessage[0] === "self") {
    message = errorMessage[1];
  } else {
    message = "Something went wrong.";
  }

  return NextResponse.json(
    {
      message: message,
      success: false,
      data: [],
      error: error,
    },
    { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
  );
};

export default ErrorResponseHandler;
