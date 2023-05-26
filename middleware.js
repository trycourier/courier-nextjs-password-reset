import { NextResponse } from 'next/server'
import { getSession } from './session'

export function middleware(request) {
    const authenticated = getSession(request, 'authenticated')
    if (authenticated) {
      return NextResponse.next()
    }
    else {
      const forgotUrl = new URL('/', request.url)
      forgotUrl.searchParams.set('message', 'You are not authorized')
      return NextResponse.redirect(forgotUrl)
    }
}

export const config = {
  matcher: ['/new-password', '/reset-password'],
}