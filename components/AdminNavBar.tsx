import Image from 'next/image'
import Link from 'next/link'
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
import { HiMenuAlt2 } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { IoLogOut } from 'react-icons/io5'
import NavLink from '@/components/NavLink'
import { IconType } from 'react-icons'

const AdminNavbar = ({
  navLinks,
}: {
  navLinks: { href: string; label: string; Icon: IconType }[]
}) => {
  return (
    <nav className='border'>
      <div className='container flex items-center justify-between py-3 '>
        <div className='hidden md:flex flex-col lg:flex-row lg:justify-end '>
          <h1 className=''>
            <span className='font-bold text-lg'>Welcome to admin panel, </span>
            <span className='text-sm'>
              Here you can view, add, edit, and delete news
            </span>
          </h1>
        </div>
        <Link href={'/news'} className='hidden md:inline-block'>
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

export default AdminNavbar
