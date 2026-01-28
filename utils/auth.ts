import { prisma } from "@/lib/prisma";
import { getServerSession, User, NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: User & { isAdmin: boolean } 
  }
}

declare module "next-auth/jwt" {
  interface JWT {  
    isAdmin: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [ 
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }), 
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    },
  },
  callbacks: {
    async signIn({ user }) {
      // Create or update user in database
      if (user.email) {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: new Date(),
          },
        });
      }
      return true;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  
    async jwt({ token, user }) {
      if (user?.email) {
        const userInDB = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.isAdmin = userInDB?.isAdmin ?? false;
      } else if (token.email) {
        const userInDB = await prisma.user.findUnique({
          where: { email: token.email },
        });
        token.isAdmin = userInDB?.isAdmin ?? false;
      }
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);