"use client";

import React from "react";
import { useTranslations } from "next-intl";

import Image from "next/image";
import plant from "@/public/plantsWithCents.svg";
import ContactForm from "@/components/contact/ContactForm";
import { FaPhoneVolume } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import Vector from "@/public/Vector.svg";
import GoogleMap from "@/components/contact/GoogleMap";
import InfoBoard from "@/components/contact/InfoBoard";
import TitleFadeIn from "@/components/animation/TitleFadeIn";
import SlideFrom from "@/components/animation/SlideFrom";
import FadeIn from "@/components/animation/FadeIn";

const ContactUs = () => {
  const tContactPage = useTranslations("ContactUs");

  return (
    <>
      <div className="space-y-7 md:pt-14 pt-8">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {tContactPage("Header")}
        </div>
        <div className="flex md:translate-x-10">
          <TitleFadeIn
            className="font-semibold text-xl lg:text-5xl mt-2 lg:mt-0"
            title={tContactPage("Title")}
          />
          <Image
            src={Vector}
            alt="vectorimage"
            className="hidden md:inline-block"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-x-10 md:w-[75%] w-[90%] py-10">
        <div className="md:inline-block flex-1 flex-col">
          <SlideFrom from="left" className="relative w-full h-64 md:h-full">
            <Image
              src={plant}
              fill
              className="h-full rounded-xl lg:rounded-3xl"
              alt="2 plants in a jar with cents"
            />
            <div className="ripple absolute md:left-30 translate-x-10 -translate-y-8 md:bottom-60 transform md:-translate-x-1/2 md:-translate-y-1/2 shadow-xl rounded-full flex items-center justify-center bg-white h-14 w-14 md:w-20 md:h-20">
              <BiSolidMessageRounded className="text-2xl" size={40} />
              <div className="absolute md:bottom-10 md:right-14 translate-x-14 md:translate-x-0 bg-primary w-20 md:w-32 h-10 flex justify-center items-center px-3 text-center rounded-full text-white">
                <p className="text-sm">{tContactPage("Sending")}</p>
              </div>
            </div>
            <div className="absolute md:right-1/3 translate-y-56 translate-x-40 md:top-30 transform md:translate-x-1/2 md:translate-y-24 shadow-xl rounded-full flex items-center justify-center bg-white h-14 w-14 md:h-20 md:w-20">
              <FaPhoneVolume className="text-2xl" />
              <div className="absolute md:-translate-y-8 translate-x-14 md:translate-x-0 md:left-14 bg-primary w-20 md:w-32 h-10 flex justify-center items-center px-3 text-center rounded-full text-white">
                <p className="text-sm">{tContactPage("Calling")}</p>
              </div>
            </div>
            <div className="hidden md:flex w-full items-center absolute bottom-10 md:bottom-20 mx-auto">
              <FaPhoneVolume className="text-primary translate-x-[120px]" />
              <p className="mx-auto">+251937999995 / +251937999996</p>
            </div>
          </SlideFrom>
        </div>
        <SlideFrom from="right" className="flex-1 ">
          <ContactForm />
        </SlideFrom>
      </div>
      <div className="md:h-[100px] sm:h-[50px] lg:h-[150px]" />
      <div className="relative w-full py-20">
        <FadeIn className="">
          <GoogleMap />
        </FadeIn>
        <InfoBoard />
      </div>
    </>
  );
};

export default ContactUs;
