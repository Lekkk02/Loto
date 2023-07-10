import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connect from "@/utils/db";
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
      authorize(credentials, req) {
        const user = { id: "1", fullname: "J. Smith", email: "john@gmail.com" };
        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
