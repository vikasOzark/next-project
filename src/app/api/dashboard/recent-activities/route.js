import { ErrorResponse } from "@/utils/ErrorResponseHandler";

export default async function GET() {
  try {
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}
