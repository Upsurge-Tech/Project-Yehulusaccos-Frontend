"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Logo2.png";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#FAFFFC] w-full p-10 border-t-[1px] border-stone-200">
      <div className="mx-auto flex md:flex-row flex-col md:justify-between md:gap-x-10 space-y-8 md:space-y-0">
        <Link href="/home" className="flex items-start justify-center">
          <Image src={Logo} alt="Company Logo" width={70} height={70} />
        </Link>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-center md:text-start">
            About the company
          </h2>
          <p className="text-center md:text-start">
            Learn to love growth and change and you <br /> will be a success.
            Microsoft patch.
          </p>
          <div className="flex gap-x-4 justify-center md:justify-start">
            <Link href="https://www.facebook.com/profile.php?id=61554075832185">
              <FaFacebook
                className="text-green-600 hover:scale-110 transition-transform duration-300"
                size={25}
              />
            </Link>
            <Link href="https://www.instagram.com/@yehulu_sacco">
              <FaInstagram
                className="text-green-600 hover:scale-110 transition-transform duration-300"
                size={25}
              />
            </Link>
            <Link href="https://www.tiktok.com/@yehulu_sacco">
              <FaTiktok
                className="text-green-600 hover:scale-110 transition-transform duration-300"
                size={25}
              />
            </Link>
            <Link href="https://www.youtube.com/@yehulusacco">
              <FaYoutube
                className="text-green-600 hover:scale-110 transition-transform duration-300"
                size={25}
              />
            </Link>
            <Link href="https://www.t.me/hullucooprativeAssociationPrivat">
              <FaTelegram
                className="text-green-600 hover:scale-110 transition-transform duration-300"
                size={25}
              />
            </Link>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <FiPhoneCall className="text-green-600" />
            <span>+251 937999995 / +251 937999996</span>
          </div>
        </div>
        <div className="md:space-y-4">
          <h2 className="text-lg font-semibold">Pages</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/services" className="hover:text-green-600">
                Services
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-green-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-green-600">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:space-y-4">
          <h2 className="text-lg font-semibold">Get started</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/careers" className="hover:text-green-600">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/legal-documents" className="hover:text-green-600">
                Legal documents
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:space-y-4">
          <h2 className="text-lg font-semibold">About</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-green-600">
                Yehulu at a glance
              </Link>
            </li>
            <li>
              <Link href="/mission" className="hover:text-green-600">
                Mission, vision, and values
              </Link>
            </li>
            <li>
              <Link href="/shareholders" className="hover:text-green-600">
                Shareholders
              </Link>
            </li>
            <li>
              <Link href="/investor-relations" className="hover:text-green-600">
                Investor relations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
