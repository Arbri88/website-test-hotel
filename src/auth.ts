import { prisma } from './lib/prisma'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session { user: { id: string; role: string } & DefaultSession['user'] }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: { email: { label: 'Email' }, password: { label: 'Password' } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email as string } })
        if (!user) return null
        const isValid = await compare(credentials.password as string, user.password)
        if (!isValid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }) { if (user) { token.id = user.id; token.role = (user as any).role } return token },
    async session({ session, token }) { if (session.user) { session.user.id = token.id as string; session.user.role = token.role as string } return session },
  },
})
