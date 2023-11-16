import { NextResponse } from "next/server";
import httpStatus from "./httpStatus";

/**
 *
 * @param {String} message Pass any sutable message or leave it for default `Successfully data is fetched.`
 * @param {Array} data Pass any data to return to the client side
 * @param {string} status Pass Status for client or leave it default `httpStatus.HTTP_200_OK`
 * @returns
 */
const SuccessResponseHandler = (
  data = [],
  message,
  statusCode = httpStatus.HTTP_200_OK
) => {
  return NextResponse.json(
    {
      data: data,
      message: message,
      success: true,
    },
    { status: statusCode }
  );
};

export default SuccessResponseHandler;
