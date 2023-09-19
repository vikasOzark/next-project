import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          // credentials: {
          //   email: { label: "Email", type: "text", placeholder: "jsmith" },
          //   password: { label: "Password", type: "password" }
          // },
          async authorize(credentials, req) {
            const dataResponse = await fetch('http://127.0.0.1:8000/v1/api/auth/login/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: credentials?.email,
                password : credentials?.password
              })
            })
            const user = await dataResponse.json()
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],

    // pages: {
    //     signIn: '/auth/login',
    //     signOut: '/auth/login',
    //   }
})

export { handler as GET, handler as POST}