import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import User from '../../models/users'
import { getSession, setSession } from '../../session'

export async function POST(request) {
  // get phone number and email from form payload
  const data = await request.json()
  const { token } = data
  // get user_id from session
  const userId = getSession(request, 'user_id')
  const storedToken = "" + await kv.get(`${userId}:reset`) // ensure the token is of type string
  if (userId && token && (token === storedToken)) {
    // redirect to reset password page
    const response = NextResponse.json({
      redirect: '/new-password'
    })
    setSession(response, 'authenticated', true)
    return response
  }
  else {
    // redirect and display error
    return NextResponse.json({
      error: 'Token did not match, please try again?'
    })
  }
}