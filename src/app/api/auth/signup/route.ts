import users from '@/models/users'
import { NextRequest, NextResponse } from 'next/server'
import argon2 from 'argon2'
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
          success: false
        },
        { status: 400 }
      )
    }
    const unique = await users.findOne({ $or: [{ name }, { email }] })
    if (unique) {
      return NextResponse.json(
        {
          message: 'User already exists',
          success: false
        },
        { status: 409 }
      )
    }
    const hashedPassword = await argon2.hash(password)
    const user = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      ...{ createAt: new Date() }
    })
    if (!user.insertedId) {
      return NextResponse.json({
        message: 'Failed to create user',
        success: false
      })
    }
    return NextResponse.json(
      {
        message: 'User created successfully',
        success: true
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Signup failed', success: false })
  }
}
