import React from 'react'
import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'

const values = [
  'Helping members achieve financial freedom, simplify their lives and live their dreams.',
  'Being able to support hardworking employees with low income sources will enable them to reach their earning potential.',
  'Meet the needs of the user society by generating long-term financial reserves.',
  'Reducing unemployment and economic problems as a responsible stakeholder.',
  'To develop and expand savings and loan services among members and the community.',
  'Build a large-scale membership of the largest financial provider association in Ethiopia.',
  'Providing loan services by encouraging unsecured workers who wanted to use loan services.',
  'Being able to make a positive impact in the financial sector.',
]

const OurBelieve = () => {
  return (
    <div className=' w-full  flex flex-col items-center'>
      <div className='bg-primarySoft w-48 mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg'>
        {' '}
        OUR BELEIVE
      </div>
      <h2 className='font-semibold text-2xl lg:text-4xl'>
        Our Guiding Principles
      </h2>
      <div className='hidden lg:flex relative  -rotate-45 lg:-top-2 left-48 '>
        <Image
          src='/curlyarrow.svg'
          alt='curly green arrow'
          width={100}
          height={100}
        />
      </div>
      <div className='w-full flex flex-col gap-y-20 xl:gap-y-0 xl:flex-row'>
        <div className='flex flex-col gap-y-20 w-full '>
          <div className=' flex flex-col'>
            <Image
              src={'/threecircles.svg'}
              width={30}
              height={30}
              alt='three circles'
            />
            <h3 className='text-lg font-semibold pt-5'>Vision</h3>
            <p className='text-gray-600 text-sm'>Access to finance for all</p>
          </div>
          <div className='flex flex-col'>
            <Image
              src={'/briefcase.svg'}
              width={30}
              height={30}
              alt='briefcase'
            />
            <h3 className='text-lg font-semibold pt-5'>Mission</h3>
            <p className='text-gray-600 text-sm'>
              Providing savings and credit services easily with modern
              technology
            </p>
          </div>
        </div>
        <div className='flex flex-col w-full gap-y-5 '>
          <Image
            src={'/rocket.svg'}
            width={30}
            height={30}
            alt='green rocket'
          />
          <h3 className='text-lg font-semibold'>Values</h3>
          <div className='flex flex-col gap-y-5'>
            {values.map((value) => (
              <div key={value} className='flex  gap-x-5  text-gray-500'>
                <div>
                  <FaCheckCircle size={20} />
                </div>
                <p className=' text-sm'>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurBelieve
