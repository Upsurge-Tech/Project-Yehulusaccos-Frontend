"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Logo2.png";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Footer = () => {
  const tFooter = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="bg-[#FAFFFC] w-full p-10 border-t-[1px] border-stone-200">
      <div className="container mx-auto flex md:flex-row flex-col md:justify-between md:gap-x-10 space-y-8 md:space-y-0">
        <Link href={`/${locale}/home`} className="flex items-start justify-center">
          <Image src={Logo} alt="Company Logo" width={100} height={100} />
        </Link>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-center md:text-start">
            {tFooter("AboutCompany")}
          </h2>
          <p className="text-center md:text-start">
            {tFooter("Paragraph1")}
            <br />
            {tFooter("Paragraph2")}
          </p>
          <div className="flex gap-x-4 justify-center md:justify-start">
            <Link href="https://www.facebook.com/profile.php?id=61554075832185">
              <FaFacebook className="text-green-600 hover:scale-110 transition-transform duration-300" size={25} />
            </Link>
            <Link href="https://www.instagram.com/@yehulu_sacco">
              <FaInstagram className="text-green-600 hover:scale-110 transition-transform duration-300" size={25} />
            </Link>
            <Link href="https://www.tiktok.com/@yehulu_sacco">
              <FaTiktok className="text-green-600 hover:scale-110 transition-transform duration-300" size={25} />
            </Link>
            <Link href="https://www.youtube.com/@yehulusacco">
              <FaYoutube className="text-green-600 hover:scale-110 transition-transform duration-300" size={25} />
            </Link>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <FiPhoneCall className="text-green-600" />
            <span>+251 937999995 / +251 937999996</span>
          </div>
        </div>
        <div className="md:space-y-4">
          <h2 className="text-lg font-semibold">{tFooter("Pages")}</h2>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/services`} className="hover:text-green-600">
                {tFooter("Services")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/faq`} className="hover:text-green-600">
                {tFooter("Faq")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/news`} className="hover:text-green-600">
                {tFooter("News")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-green-600">
                {tFooter("Contactus")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:space-y-4">
          <h2 className="text-lg font-semibold">{tFooter("GetStarted")}</h2>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-green-600">
                {tFooter("contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:space-y-4">
          <h2 className="text-lg font-semibold">{tFooter("About")}</h2>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/about`} className="hover:text-green-600">
                {tFooter("Glance")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/home`} className="hover:text-green-600">
                {tFooter("Mission")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
