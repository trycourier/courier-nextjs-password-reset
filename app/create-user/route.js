import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import { createUser } from '../../models/users'
import { setSession } from '../../session'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  // get full name, phone number and email from form payload
  const data = await request.json();
  console.log(data)
  // create the User
  const { name, email, phone, password } = data
  const user_id = await createUser({ name, email, phone, password })
  console.log(user_id)
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