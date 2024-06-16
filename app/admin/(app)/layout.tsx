"use client";

import AdminNavbar from "@/components/AdminNavBar";
import AdminSideBar from "@/components/AdminSideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { IconType } from "react-icons";
import { MdAddBox } from "react-icons/md";
import { RiFileListFill } from "react-icons/ri";

const navLinks: { href: string; label: string; Icon: IconType }[] = [
  { href: "/admin/posts", label: "All Posts", Icon: RiFileListFill },
  { href: "/admin/new-post", label: "Add New", Icon: MdAddBox },
];

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="flex">
      <div className="hidden md:block">
        <AdminSideBar navLinks={navLinks} />
      </div>
      <div className="flex-1 flex flex-col h-screen ">
        <AdminNavbar navLinks={navLinks} />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="flex-1 py-9 container" id="admin-shell">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
