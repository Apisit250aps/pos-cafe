import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import client from './libs/database/client'
import Credentials from 'next-auth/providers/credentials'
import argon2 from 'argon2'
import users from './models/users'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: 'jwt', maxAge: 86400 },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'Name' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        try {
          const { name, password } = credentials as {
            name: string
            password: string
          }
          const user = await users.findOne({ name })
          if (!user) {
            return null
          }
          const authentication = await argon2.verify(user.password!, password)
          if (!authentication) {
            return null
          }
          await users.findOneAndUpdate(
            { _id: user._id },
            { $set: { lastLogin: new Date(), updatedAt: new Date() } }
          )
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          }
        } catch (error) {
          console.error(error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }
      return session
    }
  }
})
