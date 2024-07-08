import React, { useState } from 'react';
import logoColor from '../assets/logoColor.png';
import navBell from '../assets/navBell.png'
import navDrop from '../assets/navDrop.png'

function Navbar() {
    const [topic, setTopic] = useState('PHYSICS')
  return (
    <div className="h-[10vh] w-full bg-white shadow-md flex justify-between font-roboto px-5">
      <div className="flex flex-col items-center justify-center">
        <img src={logoColor} className="h-[50%]" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center ">
            <h2 className='text-2xl text-textGrey font-bold'>EXAM CATEGORY: {topic}</h2>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <img src={navBell} className="h-[50%] cursor-pointer hover:shadow-md border-none rounded-xl " alt="Notifications" />
        <img src={navDrop} className="h-[50%] cursor-pointer hover:shadow-md border-none rounded-xl" alt="Dropdown" />
      </div>
    </div>
  );
}

export default Navbar;
