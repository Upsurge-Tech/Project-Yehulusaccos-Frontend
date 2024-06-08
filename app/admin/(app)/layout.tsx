import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import Logo2 from '@/public/assets/Logo2.png'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HiMenuAlt2, HiX } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { RiFileListFill } from 'react-icons/ri'
import { MdAddBox } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'
import { link } from 'fs'
import NavLink from '@/components/NavLink'

const navLinks = [
  { href: '/admin/posts', label: 'All Posts', Icon: RiFileListFill },
  { href: '/admin/new-post', label: 'Add New', Icon: MdAddBox },
]

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex'>
      <div className=''>
        <AdminSideBar />
      </div>
      <div className='flex-1'>
        <AdminNavbar />
        <div>{children}</div>
      </div>
    </div>
  )
}
export default Layout

const AdminSideBar = () => {
  return (
    <nav className='border h-screen py-9 flex flex-col items-center gap-9'>
      <Link href='/home' className=''>
        <Image
          src={Logo2}
          alt='imageLogo'
          width={70}
          height={70}
          className='relative w-[50px] h-[50px] md:w-[70px]  md:h-[70px]'
        />
      </Link>

      <div className='flex-1 flex flex-col'>
        {navLinks.map(({ href, label, Icon }) => (
          <NavLink
            className=' flex justify-center '
            activeClassName='bg-primary/10 text-primary'
            nonActiveClassName=''
            key={href}
            href={href}
          >
            <Button
              variant={'ghost'}
              className='flex gap-2 items-center py-2 px-12'
            >
              <Icon className='text-2xl' />
              <span>{label}</span>
            </Button>
          </NavLink>
        ))}
      </div>

      <Button variant={'ghost'} className='w-full'>
        <div className='flex gap-2 items-center'>
          <IoLogOut className='text-2xl' />
          <span className='text-md'>Logout</span>
        </div>
      </Button>
    </nav>
  )
}

const AdminNavbar = () => {
  return (
    <nav className='border'>
      <div className='container flex items-center justify-between md:p-3 '>
        <div className='flex flex-col lg:flex-row lg:justify-end'>
          <h1>
            <span className='font-bold text-lg'>Welcome to admin panel, </span>
            <span className='text-sm'>
              Here you can view, add, edit, and delete news
            </span>
          </h1>
        </div>
        <Link href={'/news'}>
          <Button className='shadow-lg shadow-primary/20'>
            Visit On Website
          </Button>
        </Link>
        <Link href='/home' className='md:hidden'>
          <Image
            src={Logo2}
            alt='imageLogo'
            width={70}
            height={70}
            className='relative w-[50px] h-[50px] md:w-[70px]  md:h-[70px]'
          />
        </Link>
        <h1 className='md:hidden'>Admin Panel</h1>
        <div className='md:hidden'>
          <Sheet>
            <SheetTrigger>
              <HiMenuAlt2 className='text-3xl' />
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
              <SheetHeader>
                <SheetTitle>Welcome to admin panel</SheetTitle>
                <SheetDescription>
                  Here you can view, add, edit, and delete news
                </SheetDescription>
              </SheetHeader>

              <div className='flex-1 pt-6 flex flex-col gap-2'>
                <Link href='/news'>
                  <Button className='w-full'>Visit On Website</Button>
                </Link>
                {navLinks.map(({ href, label, Icon }) => (
                  <NavLink
                    className=' flex justify-center py-2'
                    activeClassName='bg-primary/10  text-primary'
                    nonActiveClassName=''
                    key={href}
                    href={href}
                  >
                    <SheetClose>
                      <div className='flex gap-2 items-center'>
                        <Icon className='text-2xl' />
                        <span>{label}</span>
                      </div>
                    </SheetClose>
                  </NavLink>
                ))}
                <div className='flex-1 flex flex-col justify-end'>
                  <Button variant={'ghost'}>
                    <div className='flex gap-2 items-center'>
                      <IoLogOut className='text-2xl' />
                      <span className='text-md'>Logout</span>
                    </div>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
