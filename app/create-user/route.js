import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import { createUser } from '../../models/users'
import { setSession } from '../../session'

const courier = CourierClient()
const cleanupUrl = process.env.CLEANUP_URL

export async function POST(request) {
  const data = await request.json()
  // get full name, phone number, email and password from form payload
  const { name, email, phone, password, preference } = data
  // create the User
  const user_id = await createUser({ name, email, phone, password, preference })
  // create the Courier Profile for this User
  await courier.mergeProfile({
    recipientId: user_id, 
    profile: { 
      phone_number: phone,
      email,
      name,
      // Courier supports storing custom JSON data for Profiles
      custom: {
        preference
      }
    } 
  })
  // if this is the demo app, and a cleanup URL is configured, request a cleanup of this profile after 5 minutes
  if (cleanupUrl) {
    await fetch(cleanupUrl, { method: 'POST', body: JSON.stringify({user_id}) })
  }
  // return response
  const response = NextResponse.json({
	  redirect: '/',
	  message: 'Your User has been created 👍'
  })
  setSession(response, 'user_id', user_id)
  return response
}