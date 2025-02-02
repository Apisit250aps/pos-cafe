import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import client, { dbName } from './libs/database/client'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client, { databaseName: dbName }),
  providers: []
})
