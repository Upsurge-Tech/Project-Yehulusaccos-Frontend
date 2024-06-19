"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo2 from "@/public/assets/Logo2.png";
import Link from "next/link";
import NavLink from "./NavLink";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const NavBar = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();

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
    { href: `/${locale}/services`, label: t("services"), key: "services" },
    { href: `/${locale}/about`, label: t("about"), key: "about" },
    { href: `/${locale}/faq`, label: t("faq"), key: "faq" },
    { href: `/${locale}/news`, label: t("news"), key: "news" },
    { href: `/${locale}/loan_eligibility`, label: t("loan"), key: "loan" },
  ];

  return (
    <div className={`fixed bg-stone-50 z-30 py-[6px] px-3 md:px-7 w-full ${scrollActive ? "shadow-sm" : ""}`}>
      <div className="container flex justify-between items-center">
        <Link href={`/${locale}/home`} className="w-[50px] md:w-[70px] h-[50px] md:h-[70px]">
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
          <LanguageSwitcher />
          <Link href={`/${locale}/contact`}>
            <div className="hidden lg:flex bg-primary text-white px-6 py-3 rounded-lg">
              {t("contactUs")}
            </div>
          </Link>
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

          <Link
            href={`/${locale}/contact`}
            onClick={() => setMenuOpen(false)}
            className="mb-6 w-full text-center bg-primary text-white px-6 py-3 rounded-lg"
          >
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
