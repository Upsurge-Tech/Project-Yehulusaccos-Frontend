"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo2 from "@/public/assets/Logo2.png";
import Link from "next/link";
import NavLink from "./NavLink";
import { HiMenuAlt2, HiX } from "react-icons/hi";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/services", label: "Services", key: "services" },
    { href: "/about", label: "About us", key: "about" },
    { href: "/faq", label: "Faq", key: "faq" },
    { href: "/news", label: "News and announcements", key: "news" },
    { href: "/loan_eligibility", label: "Loan and eligibility", key: "loan" },
  ];

  return (
    <div
      className={`py-3 px-3 lg:px-7 w-full ${scrollActive ? "shadow-md" : ""}`}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/home"
          className="w-[50px] md:w-[70px] h-[50px] md:h-[70px]"
        >
          <Image src={Logo2} alt="imageLogo" className="w-full h-full" />
        </Link>
        <div className="hidden lg:flex items-center">
          <div className="flex justify-between md:gap-x-9 font-semibold">
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                href={link.href}
                activeClassName="text-primary"
                nonActiveClassName="inactive-link"
                onClick={() => setActiveLink(link.key)}
                className={`${activeLink === link.key ? "text-primary" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="relative inline-block">
            <select className="block appearance-none w-full bg-white hover:border-green-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline">
              <option>EN</option>
              <option>አማ</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-500">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12l-6-6h12l-6 6z" />
              </svg>
            </div>
          </div>
          <div className="hidden lg:flex bg-primary text-white px-6 py-3 rounded-lg">
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-3xl">
              <HiMenuAlt2 />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-black bg-opacity-50 md:bg-opacity-0 z-50 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`lg:hidden flex flex-col items-center mt-3 space-y-2 p-4 w-full bg-white shadow-lg rounded-lg transform transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <button
            onClick={closeMenu}
            className="absolute top-0 right-0 m-4 text-3xl px-5"
          >
            <HiX />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="py-2 w-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mb-6 w-full text-center bg-primary text-white px-6 py-3 rounded-lg">
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
