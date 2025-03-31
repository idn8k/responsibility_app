import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt'; // fFor password comparison!
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
