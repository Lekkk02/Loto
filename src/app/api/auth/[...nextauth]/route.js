import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Cajero from "@/models/cajeroModel";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        await connect();
        console.log(credentials);
        const userFound = await Cajero.findOne({
          username: credentials.username,
        });
        console.log(userFound.password);
        if (!userFound) throw new Error("Invalid credentials");
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Invalid credentials");

        console.log(userFound);
        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      console.log(session, token);
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
