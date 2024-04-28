import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * This method is used to get this user info such as user id and uniquCompanyId.
 * @param {Boolean} all Default is false means this method will return logged in user id or if all is true this method will return userId and unique company id.
 * @returns This method is responsible to provide user id and company id.
 */
export default async function getUserId(all = false) {
  try {
    const { user } = await getServerSession(authOptions);
    if (all) {
      return { ...user, userId: user.id };
    }
    return user.id;
  } catch (error) {
    return false
  }
}
