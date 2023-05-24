import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import { findUserByEmail, findUserByPhone } from '../../models/users'
import { setSession } from '../../session'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  // get phone number and email from form payload
  const data = await request.json()
  const { email, phone } = data
  let user, mode
  // look up the user based on phone or email
  if (email) {
    user = await findUserByEmail(email)
    mode = "email"
  }
  else if (phone) {
    user = await findUserByPhone(phone)
    mode = "phone"
  }
  else {
    // neither an email nor phone number was submitted, re-direct and display error
    return NextResponse.json({
      error: 'You must provide an email or phone number'
    })
  }

  if (user) {
    const { user_id, name } = user
    // generate reset token
    const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    const ex = 5 * 60 // expire this record in 5 minutes
    // store in KV cache
    await kv.set(`${user_id}:reset`, token, { ex })
    // send notification
    await courier.send({
      message: {
        to: {
          user_id
       },
        content:{
          title: "Your password reset token",
          body: "Hi there {{ name }} 👋 Your password reset token is: {{ token }}"
        },
        data: {
          token,
          name
        }
      }
    })
    // redirect to enter token page
    return NextResponse.json({
      redirect: '/enter-token',
      mode
    })
  }
  else {
    // redirect and display error
    return NextResponse.json({
      error: 'We could not locate a user with that email address or phone number'
    })
  }
}