export default function NewPassword(request) {
  const error = request.searchParams?.error
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
        <form method="post" action="/reset-password" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">    
            { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) }     
            <div className="mb-4">Almost done! Now just enter a new password.</div>
            <div className="mb-4">
                <label htmlFor="new_password" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <input type="password" name="new_password" id="new_password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="mb-4">
                <label htmlFor="new_password_confirm" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                <input type="password" name="new_password_confirm" id="new_password_confirm" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <input type="submit" value="Reset Password" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
        </form>
    </main>
  )
}
