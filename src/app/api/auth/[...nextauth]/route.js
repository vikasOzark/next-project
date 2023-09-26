import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const response = await fetch(
          "http://127.0.0.1:8000/v1/api/auth/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        // Returning token to set in session
        return {
            token: data.data.token,
          };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = token.user;  // Setting token in session
      return session;
    },
  },
  secret: "hjfhsikfkseuseurkeukre",
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  
  pages: {
    signIn: "/login", //Need to define custom login page (if using)
  },
});


export {handler as GET, handler as POST}