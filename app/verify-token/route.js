import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import User from '../../models/users'
import { getSession, setSession } from '../../session'

export async function POST(request) {
  // get phone number and email from form payload
  const params = await request.formData()
  const token = params.get('token')
  // get user_id from session
  const user_id = getSession(request, 'user_id')
  const foo = "" + await kv.get(`${user_id}:reset`) // ensure the token is of type string
  if (user_id && token && (token === foo)) {
    // redirect to reset password page
    const response = NextResponse.redirect(new URL('/new-password', request.url))
    setSession(response, 'authenticated', true)
    return response
  }
  else {
    // redirect and display error
    const tokenUrl = new URL('/enter-token', request.url)
    tokenUrl.searchParams.set('error', 'Token did not match, please try again?')
    return NextResponse.redirect(tokenUrl);
  }
}