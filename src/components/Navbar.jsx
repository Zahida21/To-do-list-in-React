import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-800 text-white py-2'>
        <div className="log">
            <span className='font-bold text-lg mx-9  items-center'>My Tasks</span>
        </div>
        <ul className="flex gap-10 mx-9 items-center cursor-pointer ">
            <li className='hover:font-bold transition-all duration-100'>Home</li>
            <li className='hover:font-bold transition-all duration-100'>Your Tasks</li>
           
        </ul>

    </nav>
  )
}

export default Navbar
