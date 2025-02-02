import { db } from '@/libs/database/client'
import { User } from 'next-auth'
import argon2 from 'argon2'
const users = db.collection<User>('users')
export async function createUser({
  name,
  email,
  password
}: User): Promise<unknown> {
  try {
    const unique = await users.findOne({ $or: [{ name }, { email }] })
    if (unique) {
      throw new Error('User already exists')
    }
    const hashedPassword = await argon2.hash(password!)

    const newUser = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      ...{ createAt: new Date() }
    })
    return {
      _id: newUser.insertedId,
      name,
      email,
      role: 'user'
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user')
  }
}

export async function authentication(
  name: string,
  password: string
): Promise<boolean> {
  try {
    const user = await users.findOne({ name })
    if (!user) {
      throw new Error('User not found!')
    }
    const valid = await argon2.verify(user.password!, password)
    return valid
  } catch (error) {
    console.error(error)
    throw new Error('Invalid credentials!')
  }
}

export default users
