import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt'; // For password comparison!
import clientPromise from '@/lib/mongodb';
// import clientPromise from '../../../lib/mongodb'; //- in case the first one breaks -//

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
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
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
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
              access_token: account.access_token, // Include other relevant account data
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            });
            existingAccount = { userId: existingUser._id }; // Simulate existing account
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
    },

    async jwt({ token, account, profile }) {
      if (profile?.email) {
        token.email = profile.email.toLowerCase();
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user?.email) {
        session.user.email = session.user.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE.ENV === 'development',
};

export default NextAuth(authOptions);
