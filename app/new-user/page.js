'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

async function createUser(payload) {
	const res = await fetch('/create-user', { method: 'POST', body: JSON.stringify(payload) })
	if (!res.ok) return undefined
	return res.json()
}

export default function EnterToken(request) {
  const router = useRouter()
  const [ error, setError ] = useState()

  async function onCreateUser(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const payload = {
	    name: formData.get('name'),
	    email: formData.get('email'),
	    phone: formData.get('phone'),
	    password: formData.get('password'),
    }
    const response = await createUser(payload)
    if (response.error) {
      setError(response.error)
    }
    else if (response.redirect) {
	    router.push(`${response.redirect}?message=${response.message}`)
    }
    return true
  }
  //const error = request.searchParams?.error
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
        <form onSubmit={onCreateUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">    
            { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) }     
            <div className="mb-4">
              <p>Please enter a real email or phone number in order to see how the demo works.</p>
              <p>Your data will be purged after 15 minutes.</p>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input type="text" name="name" id="name" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input type="email" name="email" id="email" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                <input type="text" name="phone" id="phone" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="text" name="password" id="password" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <input type="submit" value="Create User" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
        </form>
    </main>
  )
}