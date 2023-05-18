import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { CourierClient } from '@trycourier/courier'
import User from '../../models/users'
import { setSession } from '../../session'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  // get phone number and email from form payload
  const params = await request.formData()
  const email = params.get('email')
  const phone = params.get('phone')
  let user
  // look up the user based on phone or email
  if (email) {
    user = User.findUserByEmail(email)
  }
  else if (phone) {
    user = User.findUserByPhone(phone)
  }
  else {
    // neither an email nor phone number was submitted, re-direct and display error
    const forgotUrl = new URL('/forgot-password', request.url)
    forgotUrl.searchParams.set('error', 'You must provide an email or phone number')
    return NextResponse.redirect(forgotUrl)
  }

  if (user) {
    const { user_id, name } = user
    // generate reset token
    const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    const ex = 5 * 60 // expire this record in 5 minutes
    // store in KV cache
    await kv.set(`${user_id}:reset`, token, { ex });
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
        },
        routing: {
          method: "single",
          channels: [
            "sms", "email"
          ]
        }
      }
    })
    // redirect to reset password page
    const response = NextResponse.redirect(new URL('/enter-token', request.url))
    console.log("here")
    setSession(response, 'user_id', user_id)
    return response
  }
  else {
    // redirect and display error
    const forgotUrl = new URL('/forgot-password', request.url)
    forgotUrl.searchParams.set('error', 'We could not locate a user with that email address or phone number')
    return NextResponse.redirect(forgotUrl);
  }
}