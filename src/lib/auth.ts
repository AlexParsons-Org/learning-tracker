import { NextAuthOptions } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        // For demo purposes - in production, implement proper password hashing
        const user = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
        
        if (user.length > 0) {
          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
            image: user[0].avatar,
          };
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user?.email) {
        const dbUser = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
        if (dbUser.length > 0) {
          session.user.id = dbUser[0].id;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};