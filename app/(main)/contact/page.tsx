'use client';

import Image from 'next/image';
import React, {useState} from 'react';
import plant from '@/public/plantsWithCents.svg'
import ContactForm from '@/components/contact/ContactForm';
import { FaPhoneVolume } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import Vector from '@/public/Vector.svg';
import GoogleMap from '@/components/contact/GoogleMap';
import InfoBoard from '@/components/contact/InfoBoard';

const ContactPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-7 md:pt-14">
        <h1 className='bg-[#00B6590D] text-primary px-6 py-3 font-bold text-center'>CONTACT US</h1>
        <div className='flex md:translate-x-10'>
          <p className='text-4xl font-semibold'>Get in touch</p>
          <Image src={Vector} alt='vectorimage' className='hidden md:inline-block' />
        </div>
      </div>
      <div className="flex justify-between gap-x-10  md:w-[75%] w-[90%] py-10">
        <div className='hidden md:inline-block flex-1 flex-col'>
          <div className="relative w-full h-full">
            <Image
              src={plant}
              fill
              className="h-full rounded-xl lg:rounded-3xl"
              alt="2 plants in a jar with cents"
            />
            <div className="ripple absolute left-30 bottom-60 transform -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-full flex items-center justify-center bg-white w-20 h-20">
              <BiSolidMessageRounded className="text-2xl" size={40} />
              <div className="absolute bottom-10 right-14 bg-primary w-32 h-10 flex justify-center items-center px-3 text-center rounded-full text-white">
                <p className="text-sm">Sending...</p>
              </div>
            </div>
            <div className="absolute right-1/3 top-30 transform translate-x-1/2 translate-y-24 shadow-xl rounded-full flex items-center justify-center bg-white h-20 w-20">
              <FaPhoneVolume className="text-2xl"/>
              <div className="absolute -translate-y-8 left-14 bg-primary w-32 h-10 flex justify-center items-center px-3 text-center rounded-full text-white">
                <p className="text-sm">Calling...</p>
              </div>
            </div>
            <div className="w-full flex items-center absolute bottom-20 mx-auto">
              <FaPhoneVolume className='text-primary translate-x-[120px]'/>
              <p className='mx-auto'>+251937999995 / +251937999996</p>
          </div>
          </div>
        </div>
        <div className="flex-1 ">
          <ContactForm/>
        </div>
      </div>
      <div className='md:h-[100px] sm:h-[50px] lg:h-[150px]' />
      <div className='relative w-full py-20'>
        <GoogleMap/>
        <InfoBoard/>
      </div>
    </div>
  );
};

export default ContactPage;
