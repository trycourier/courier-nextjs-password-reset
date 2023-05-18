import { NextResponse } from 'next/server'
import { getSession } from './session'

export function middleware(request) {
    const authenticated = getSession(request, 'session')
    if (authenticated) {
      return NextResponse.next()
    }
    else {
      const forgotUrl = new URL('/forgot-password', request.url)
      forgotUrl.searchParams.set('error', 'You are not authorized')
      return NextResponse.redirect(forgotUrl)
    }
}

export const config = {
  matcher: ['/new-password', '/reset-password'],
};