'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

async function sendToken(payload) {
	const res = await fetch('/send-token', { method: 'POST', body: JSON.stringify(payload) })
	if (!res.ok) return undefined
	return res.json()
}

export default function ForgotPassword(request) {
  const router = useRouter()
  const [ error, setError ] = useState()

  async function onForgotPassword(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const payload = {
	    email: formData.get('email'),
	    phone: formData.get('phone')
    }
    const response = await sendToken(payload)
    if (response.error) {
      setError(response.error)
    }
    else if (response.redirect) {
	    router.push(`${response.redirect}?preference=${response.preference}`)
    }
    return true
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
        <form method="post" onSubmit={ onForgotPassword } className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">    
            { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) } 
            <div className="mb-4 text-black">Please use the same email address or phone number that you used to <a href="/new-user">create your user</a>.</div>    
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input type="email" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="mb-4 text-black">- or -</div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Mobile Phone</label>
                <input type="text" name="phone" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <input type="submit" value="Reset Password" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
        </form>
    </main>
  )
}
