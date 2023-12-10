import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const response = await handleAuthentication(credentials, req);
        if (response.success) {
          const newData = structuredClone(response.data);
          delete newData.password;

          return {
            id: response.data.id,
            is_active: true,
            name: `${response.data.first_name} ${response.data.last_name}`,
            email: response.data.email,
            contact_number: response.data.contact_number,
            parent_user: response.data.parent_user,
            role: response.data.role,
          };
        }

        return Promise.reject(new Error(response.message));
      },
    }),
  ],

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  // cookies: cookies,

  callbacks: {
    async signIn({ user }) {
      if (!user.is_active) {
        return Promise.reject(
          new Error(
            "Your account is not active, Please contact the administrator."
          )
        );
      }
      return user;
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.userData = user;
      }
      return token;
    },
    
    async session({ session, token }) {
      console.log(token);
      session.user.id = token.userId;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

const handleAuthentication = async (credentials, req) => {
  try {
    const prisma = new PrismaClient();
    const userData = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (!userData) {
      return { success: false, message: "Provided email is not valid." };
    }

    const isUser = await bcrypt.compare(
      credentials.password,
      userData.password
    );
    if (!isUser) {
      return {
        success: false,
        message: "Password is incorrect. Please try again.",
      };
    }
    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      message: "Something went wrong, Please try again.",
    };
  }
};
