"use client";

import Image from "next/image";
import Link from "next/link";
import Logo2 from "@/public/assets/Logo2.png";

import { Button } from "@/components/ui/button";
import { IoLogOut } from "react-icons/io5";
import NavLink from "@/components/NavLink";
import { IconType } from "react-icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminSideBar = ({
  navLinks,
}: {
  navLinks: { href: string; label: string; Icon: IconType }[];
}) => {
  return (
    <nav className="border h-screen py-9 flex flex-col items-center gap-9">
      <Link href="/home" className="">
        <Image
          src={Logo2}
          alt="imageLogo"
          width={70}
          height={70}
          className="relative w-[50px] h-[50px] md:w-[70px]  md:h-[70px]"
        />
      </Link>

      <div className="flex-1 flex flex-col">
        {navLinks.map(({ href, label, Icon }) => (
          <NavLink
            className=" flex justify-center "
            activeClassName="bg-primary/10 text-primary"
            nonActiveClassName=""
            key={href}
            href={href}
          >
            <Button
              variant={"ghost"}
              className="flex gap-2 items-center py-2 px-12"
            >
              <Icon className="text-2xl" />
              <span>{label}</span>
            </Button>
          </NavLink>
        ))}
      </div>

      <Button
        variant={"ghost"}
        className="w-full"
        onClick={async () => {
          await signOut({ redirect: true, callbackUrl: "/admin/login" });
        }}
      >
        <div className="flex gap-2 items-center">
          <IoLogOut className="text-2xl" />
          <span className="text-md">Logout</span>
        </div>
      </Button>
    </nav>
  );
};

export default AdminSideBar;
