import React from 'react';
import logoColor from '../assets/logoColor.png';
import fb from '../assets/fb.png'
import ig from '../assets/ig.png'
import yt from '../assets/yt.png'
import twitter from '../assets/twitter.png'


function Footer() {
  return (
    <>
      <div className="fixed bottom-0 flex flex-col h-[20vh] w-full items-center justify-evenly shadow-custom px-5 bg-white">
        <div className="w-full h-[65%] flex items-center justify-between just border-b-[1px] border-grey">
        <div className="flex flex-col items-center justify-center">
          <img src={logoColor} className="w-[13rem]" alt="" />
        </div>

        <div className="flex gap-8 items-center justify-center">
          <img
            src={fb}
            onClick={()=>window.location.href='https.//facebook.com'}
            className="w-[2.5rem] cursor-pointer hover:border-[1px] border-gray-300 rounded-full "
            alt="Notifications"
          />
          <img
            src={twitter}
            className="w-[2.5rem] cursor-pointer hover:border-[1px] border-gray-300 rounded-full"
            alt="Dropdown"
          />
          <img
            src={yt}
            className="w-[2.5rem] cursor-pointer hover:border-[1px] border-gray-300 rounded-full "
            alt="Notifications"
          />
          <img
            src={ig}
            className="w-[2.5rem] cursor-pointer hover:border-[1px] border-gray-300 rounded-full"
            alt="Dropdown"
          />
        </div>
        </div>
        <div className="w-[30rem] flex items-center justify-evenly">
            <p className="font-light text-xs"> © Copyright Clinical Scholar </p>
            <p className="font-light text-xs"> | </p>
            <p className="font-light text-xs"> Powered by Quinoid Buisness Solutions </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
