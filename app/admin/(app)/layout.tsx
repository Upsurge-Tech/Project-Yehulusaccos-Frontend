import { ReactNode } from 'react'
import { RiFileListFill } from 'react-icons/ri'
import { MdAddBox } from 'react-icons/md'
import { IconType } from 'react-icons'
import AdminNavbar from '@/components/AdminNavBar'
import AdminSideBar from '@/components/AdminSideBar'

const navLinks: { href: string; label: string; Icon: IconType }[] = [
  { href: '/admin/posts', label: 'All Posts', Icon: RiFileListFill },
  { href: '/admin/new-post', label: 'Add New', Icon: MdAddBox },
]

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex'>
      <div className='hidden md:block'>
        <AdminSideBar navLinks={navLinks} />
      </div>
      <div className='flex-1'>
        <AdminNavbar navLinks={navLinks} />
        <div>{children}</div>
      </div>
    </div>
  )
}
export default Layout
