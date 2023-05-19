import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import { createUser } from '../../models/users'
import { setSession } from '../../session'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  // get full name, phone number and email from form payload
  const params = await request.formData()
  const name = params.get('name')
  const email = params.get('email')
  const phone = params.get('phone')
  const password = params.get('password')
  // create the User
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
  const home = new URL('/', request.url)
  home.searchParams.set('message', 'Your User has been created 👍')
  const response = NextResponse.redirect(home)
  setSession(response, 'user_id', user_id)
  return response
  
}