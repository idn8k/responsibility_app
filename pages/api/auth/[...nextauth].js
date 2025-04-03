// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import { compare } from 'bcrypt'; // For password comparison!
// import clientPromise from '@/lib/mongodb';
// // import clientPromise from '../../../lib/mongodb'; //- in case the first one breaks -//

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       async authorize(credentials) {
//         const client = await clientPromise;
//         const db = client.db();

//         const email = credentials.email.toLowerCase();
//         const user = await db.collection('users').findOne({ email });

//         if (!user) {
//           throw new Error('No user found with this email');
//         }

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) {
//           throw new Error('Incorrect password');
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name || 'User',
//         };
//       },
//     }),
//   ],

//   adapter: MongoDBAdapter(clientPromise),
//   session: {
//     strategy: 'jwt',
//   },

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account?.provider === 'google') {
//         user.email = user.email.toLowerCase();

//         const client = await clientPromise;
//         const db = client.db();

//         let existingAccount = await db.collection('accounts').findOne({
//           provider: 'google',
//           providerAccountId: account.providerAccountId,
//         });

//         if (!existingAccount) {
//           const existingUser = await db.collection('users').findOne({ email: user.email });

//           if (existingUser) {
//             await db.collection('accounts').insertOne({
//               userId: existingUser._id,
//               type: account.type,
//               provider: account.provider,
//               providerAccountId: account.providerAccountId,
//               access_token: account.access_token, // Include other relevant account data
//               expires_at: account.expires_at,
//               token_type: account.token_type,
//               scope: account.scope,
//               id_token: account.id_token,
//             });
//             existingAccount = { userId: existingUser._id }; // Simulate existing account
//           }
//         }

//         if (existingAccount) {
//           user.id = existingAccount.userId.toString();
//         } else {
//           // If no existing account or user was found, allow NextAuth.js
//           // to create a new user and account as usual.
//         }
//       }
//       return true;
//     },

//     async jwt({ token, account, profile }) {
//       if (profile?.email) {
//         token.email = profile.email.toLowerCase();
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       if (session?.user?.email) {
//         session.user.email = session.user.email.toLowerCase();
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: process.env.NODE.ENV === 'development',
// };

// export default NextAuth(authOptions);

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt'; // For password comparison!
import clientPromise from '@/lib/mongodb';

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
          console.log('Credentials Provider - Authorize started');
          const client = await clientPromise;
          const db = client.db();
          console.log('Credentials Provider - DB connected');

          const email = credentials.email.toLowerCase();
          console.log('Credentials Provider - Email:', email);
          const user = await db.collection('users').findOne({ email });

          if (!user) {
            console.log('Credentials Provider - No user found');
            throw new Error('No user found with this email');
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log('Credentials Provider - Incorrect password');
            throw new Error('Incorrect password');
          }
          console.log('Credentials Provider - password correct');
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || 'User',
          };
        } catch (error) {
          console.error('Credentials Provider - Authorize error:', error);
          throw error; // Re-throw the error to prevent authentication
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
        console.log('SignIn callback started:', user, account, profile);
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
        console.log('SignIn callback completed', user);
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
