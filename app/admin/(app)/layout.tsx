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
  return <div>side</div>
}

const AdminNavbar = () => {
  return (
    <nav className='border'>
      <div className='container flex items-center justify-between '>
        <Link href='/home'>
          <Image
            src={Logo2}
            alt='imageLogo'
            width={70}
            height={70}
            className='relative w-[50px] h-[50px] md:w-[70px]  md:h-[70px]'
          />
        </Link>
        <h1>Admin Panel</h1>
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
                  className=' flex justify-center'
                  activeClassName='bg-primary/10 py-2 text-primary'
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
    </nav>
  )
}
