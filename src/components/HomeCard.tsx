"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <section
      onClick={handleClick}
      className={cn(
        "bg-orange-1 px-4 py-6 flex flex-col justify-between sm:w-[300px] w-[250px] rounded-[14px] cursor-pointer xl:max-w-[270px] min-h-[260px]",
        className
      )}
    >
      <div className="glassmorphism flex items-center justify-center size-12 rounded-[10px]">
        <Image src={img} alt="" width={27} height={27} />
      </div>

      <div className="flex flex-col gap-2 text-white">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className=" font-normal text-gray-200">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
