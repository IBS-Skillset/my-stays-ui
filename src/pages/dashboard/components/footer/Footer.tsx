import React from 'react'

function Footer() {
  return (
    <>
    <footer className="text-center text-whit bg-slate-400">
  <div className="p-6">
    <div className="">
      <div className="flex justify-center items-center">
        <div className="mr-4 text-white">Register for free</div>
        <button type="button" className="inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Sign up!
        </button>
      </div>
    </div>
  </div>

  <div className="text-center p-4 bg-slate-500">
    © 2022 Copyright:
    <div className="text-white" >Hotel.com</div>
  </div>
</footer>
    </>
  )
}

export default Footer