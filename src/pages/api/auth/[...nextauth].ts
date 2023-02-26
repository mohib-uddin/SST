import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


const authOptions:NextAuthOptions={

    session:{
      strategy:'jwt'
    },

    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {},
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const {username,password}=credentials as {
              username:string,
              password:string
            }


            const user = { id: "1", Username: "sstadmin", Name: "Mohib" }
      
            if (username=="sstadmin"&&password=="sstadmin123") {
              return user
            } else {
              throw new Error ("Invalid Credentials");
            }
          }
        })
      ],
      pages:{
          signIn:"/auth/signin"
      }

      
      

};

export default NextAuth(authOptions);