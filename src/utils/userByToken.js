import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * This method is used to get this user info such as user id and uniquCompanyId.
 * @param {Boolean} isBothData Default is false means this method will return logged in user id or if isBothData is true this method will return userId and unique company id.
 * @returns This method is responsible to provide user id and company id.
 */
export default async function getUserId(isBothData = false) {
  const { user } = await getServerSession(authOptions);
  if (isBothData) {
    return {
      userId: user.userData?.id,
      uniqueCompanyId: user.userData?.uniqueCompanyId,
    };
  }
  return user.id;
}
