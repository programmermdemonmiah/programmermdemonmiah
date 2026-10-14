import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyAdminCredentials } from "./lib/authStore";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Credentials",
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await verifyAdminCredentials(
          credentials.username as string,
          credentials.password as string
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        (session.user as { role?: unknown }).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || "emon-miah-portfolio-admin-secret-key-2026-authjs",
});
