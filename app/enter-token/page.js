export default function EnterToken(request) {
  const error = request.searchParams?.error
  const mode = request.searchParams?.mode
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
        <form method="post" action="/verify-token" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">    
            { error && ( <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{ error }</div>) }     
            <div className="mb-4">Check your { mode } and enter token that we have sent you below. </div>
            <div className="mb-4">
                <label htmlFor="token" className="block text-gray-700 text-sm font-bold mb-2">Token</label>
                <input type="token" name="token" id="token" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <input type="submit" value="Validate Token" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"></input>
        </form>
    </main>
  )
}
