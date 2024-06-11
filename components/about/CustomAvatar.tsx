import React from "react";

import Image from "next/image";

interface Props {
  src: string;
  name: string;
  role: string;
}

const CustomAvatar = ({ src, name, role }: Props) => {
  return (
    <div className="flex flex-col gap-y-2 w-[170px] lg:w-[200px]">
      <div className="relative h-28 w-28 lg:h-36 lg:w-36 2xl:h-48 2xl:w-48 rounded-full border-none">
        <Image
          className="rounded-full object-cover"
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <p className=" lg:text-lg">{name}</p>
        <p className="text-sm lg:text-md text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default CustomAvatar;
