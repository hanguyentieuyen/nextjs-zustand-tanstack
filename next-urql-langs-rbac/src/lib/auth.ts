// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Handle credentials authentication logic here
        const user = { id: 1, name: "Test User", roles: ["admin"] };
        return user ?? null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.roles = token.roles;
      return session;
    },
  },
};
