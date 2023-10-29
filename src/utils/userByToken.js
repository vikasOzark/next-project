import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export default async function getUserId(request) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({
    req: request,
    secret: secret,
    raw: true,
  });

  //   const payload = jwt.verify(token, secret);
  return "653750505572dfd718166890";
}
