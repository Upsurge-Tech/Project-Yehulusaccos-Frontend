import React from 'react';
import Image from 'next/image';
import { IoIosArrowRoundUp } from "react-icons/io";
import car from '@/public/article-images/car.jpg'

const ArticleCardMain = ({image, paragraph, date, title}) => {

  return (
    <div  className='flex flex-col gap-y-4'>
      <div className='flex-1 w-full h-full'><Image src={image} width={600} height={900} alt='cardimage' className='rounded-lg'/></div>
      <div className="flex-1 space-y-3">
        <span className='text-primary w-fit px-10 py-2 rounded-md text-center bg-[#00B6590D]'>{date}</span>
        <div className='flex justify-between items-center gap-x-3'>
            <p className='font-bold'>{title}</p>
            <IoIosArrowRoundUp className='text-primary rotate-45' size={40}/>
        </div>
        <p>{paragraph}</p>
      </div>
    </div>
  )
}

export default ArticleCardMain
