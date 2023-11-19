import NextAuth, { Account, Profile, Session, User } from "next-auth";
import { AuthOptions } from "next-auth";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("invlaid creditials");
        }

        const users = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!users) {
          throw new Error("invalid creditials");
        }

        if (!users.hashedPassword) {
          throw Error("invalid creditials");
        }

        const match = await compare(credentials.password, users.hashedPassword);

        if (!match) {
          throw new Error("Invalid creditials");
        }

        return users;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token");
      }
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token");
      }
      const decodedToken = jwt.verify(token, secret);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 40 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email;
        params.session.user.userId = params.token.id as string;
      }
      if (params.token.user) {
        params.session.user = params.token.user as any;
      }
      return params.session;
    },
    async jwt(params: {
      token: JWT;
      user?: User | undefined;
      trigger?: string | undefined;
      session?: Session | undefined;
      account?: Account | null;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (params.trigger === "update" && params.session) {
        params.token.user = params.session.user;
      }

      if (params.user) {
        params.token.email = params.user.email;
        params.token.id = params.user.id;
      }
      return params.token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
