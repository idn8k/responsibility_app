// console.log('Executing /api/auth/[...nextauth].js');

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import clientPromise from '@/lib/mongodb';

// console.log('*********************************************************');
// console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
// console.log('*********************************************************');
// console.log('process.env.NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
// console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);
// console.log('*********************************************************');

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db();

          const email = credentials.email.toLowerCase();
          const user = await db.collection('users').findOne({ email });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Incorrect password');
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || 'User',
          };
        } catch (error) {
          console.error('Credentials Provider - Authorize error:', error);
          throw error;
        }
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google') {
          user.email = user.email.toLowerCase();

          const client = await clientPromise;
          const db = client.db();

          let existingAccount = await db.collection('accounts').findOne({
            provider: 'google',
            providerAccountId: account.providerAccountId,
          });

          if (!existingAccount) {
            const existingUser = await db.collection('users').findOne({ email: user.email });

            if (existingUser) {
              await db.collection('accounts').insertOne({
                userId: existingUser._id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              });
              existingAccount = { userId: existingUser._id };
            }
          }

          if (existingAccount) {
            user.id = existingAccount.userId.toString();
          } else {
            // If no existing account or user was found, allow NextAuth.js
            // to create a new user and account as usual.
          }
        }
        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false; // Prevent sign-in if there's an error
      }
    },

    async jwt({ token, account, profile }) {
      try {
        if (profile?.email) {
          token.email = profile.email.toLowerCase();
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },
    async session({ session, token, user }) {
      try {
        if (session?.user?.email) {
          session.user.email = session.user.email.toLowerCase();
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default NextAuth(authOptions);
