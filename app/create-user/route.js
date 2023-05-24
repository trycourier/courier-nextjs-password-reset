import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import { createUser } from '../../models/users'
import { setSession } from '../../session'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  const data = await request.json()
  // get full name, phone number, email and password from form payload
  const { name, email, phone, password } = data
  // create the User
  const user_id = await createUser({ name, email, phone, password })
  // create the Courier Profile for this User
  await courier.mergeProfile({
    recipientId: user_id, 
    profile: { 
      phone_number: phone,
      email,
      name
    } 
  })
  const response = NextResponse.json({
	  redirect: '/',
	  message: 'Your User has been created 👍'
  })
  setSession(response, 'user_id', user_id)
  return response
}