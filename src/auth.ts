import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {type: 'text'},
        password: {type: 'password'}
      },
      async authorize(credentials) {
        if (
          credentials?.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return {id: '1', name: 'admin'};
        }

        return null;
      }
    })
  ]
};


/*import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import {compare} from "bcryptjs";

export const auth: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // const checkPassword = credentials.password === user.password;
        const checkPassword = await compare(credentials.password, user.password);
        if (!checkPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Some random Key",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
};*/

export default auth;

