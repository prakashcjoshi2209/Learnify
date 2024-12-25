import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/app/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          return null; // Missing credentials
        }

        await dbConnect();

        // Find the user in the database
        const user = await User.findOne({ email });

        // Validate the password
        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user._id, name: user.name, email: user.email };
        }

        return null; // Invalid credentials
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for sessions
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        await dbConnect();

        const existingUser = await User.findOne({ githubId: profile.id });

        if (!existingUser) {
          // Create a new user for first-time login
          const newUser = new User({
            name: profile.name || profile.login,
            email: profile.email || `${profile.id}@github.com`, // Fallback email
            githubAvatar: profile.avatar_url,
            githubId: profile.id,
          });
          await newUser.save();
        }
      }

      if (account?.provider === 'google') {
        await dbConnect();

        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          // Create a new user for first-time login
          const newUser = new User({
            name: profile.name,
            email: profile.email,
            googleAvatar: profile.picture,
            googleId: profile.sub,
          });
          await newUser.save();
        }
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        
        // Check if the user is from Google or GitHub and use the correct avatar
        if (account?.provider === 'github' && profile?.avatar_url) {
          token.image = profile.avatar_url;
        } else if (account?.provider === 'google' && profile?.picture) {
          token.image = profile.picture; 
        } else if (user.googleAvatar) {
          token.image = user.googleAvatar; // Use the googleAvatar saved in DB for Google users
        } else if (user.githubAvatar) {
          token.image = user.githubAvatar; // Use the githubAvatar saved in DB for GitHub users
        } else if (user.avatar) {
          token.image = user.avatar; // Fallback if the user has a general avatar
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
