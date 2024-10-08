"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className=" flex items-center justify-center h-screen w-full">
      <Card className="flex w-full max-w-[520px] border-none bg-dark-1 p-6 py-9  text-white">
        <CardContent>
          <div className="flex flex-col gap-9 ">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex items-center justify-center">
                  <Image src={iconUrl} alt="" width={72} height={72} />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Button asChild className="bg-blue-1">
              <Link href={"/"}>Back to home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
