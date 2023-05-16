import { NextResponse } from 'next/server';
import { CourierClient } from '@trycourier/courier'
import User from '../user'

const courier = CourierClient({ authorizationToken: process.env.courier_auth_token })

export async function POST(request) {
  // get phone number and email from form payload
  const params = await request.formData()
  const email = params.get('email')
  const phone = params.get('phone')
  console.log(phone, email)
  let user_id
  // look up the user based on phone or email
  if (email) {
    user_id = User.findUserByEmail(email)
  }
  else if (phone) {
    user_id = User.findUserByPhone(phone)
  }
  else {
    // neither an email nor phone number was submitted, re-direct and display error
    const forgotUrl = new URL('/forgot-password', request.url)
    forgotUrl.searchParams.set('error', 'You must provide an email or phone number')
    console.log(forgotUrl)
    return NextResponse.redirect(forgotUrl)
  }

  if (user_id) {
    // generate reset code

    // attach to User

    // send notification

    // redirect to reset password page
    return NextResponse.redirect(new URL('/reset-password', request.url));
  }
  else {
    // redirect and display error
    const forgotUrl = new URL('/forgot-password', request.url)
    forgotUrl.searchParams.set('error', 'We could not locate a user with that email address or phone number')
    console.log(forgotUrl)
    return NextResponse.redirect(forgotUrl);
  }
}