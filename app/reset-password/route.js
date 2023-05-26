import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { updatePassword } from '../../models/users'
import { getSession } from '../../session'

export async function POST(request) {
  // get passwords from payload
  const data = await request.json()
  const { newPassword, newPasswordConfirm } = data
  // get user_id from session
  const user_id = getSession(request, 'user_id')
  // update the user
  if (user_id && newPassword && newPasswordConfirm && (newPassword === newPasswordConfirm)) {
    await updatePassword(user_id, newPassword)
    return NextResponse.json({
      redirect: '/',
      message: 'Your password has been reset 👍'
    })
  }
  else {
    // password don't match
    return NextResponse.json({
      error: 'Your passwords must match'
    })
  }
}