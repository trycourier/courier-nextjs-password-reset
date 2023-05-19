import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import { updatePassword } from '../../models/users'
import { getSession } from '../../session'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  // get phone number and email from form payload
  const params = await request.formData()
  const password = params.get('new_password')
  const passwordConfirmation = params.get('new_password_confirm')
  // get user_id from session
  const user_id = getSession(request, 'user_id')
  // look up the user based on phone or email
  if (user_id && password && passwordConfirmation && (password === passwordConfirmation)) {
    updatePassword(user_id, password)
    const home = new URL('/', request.url)
    home.searchParams.set('message', 'Your password has been reset 👍')
    return NextResponse.redirect(home)
  }
  else {
    // password don't match
    const newPassword = new URL('/new-password', request.url)
    newPassword.searchParams.set('error', 'Your passwords must match')
    return NextResponse.redirect(newPassword)
  }
}