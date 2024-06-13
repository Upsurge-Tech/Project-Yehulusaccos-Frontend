"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const Error = () => {
  const router = useRouter();
  return (
    <div className="h-screen text-primary w-full gap-y-5 flex flex-col items-center justify-center">
      <p className="text-8xl font-bold text-primary">404</p>
      <p className="font-semibold">News article not found.</p>
      <Button
        onClick={() => router.push("/news")}
        className="rounded-full shadow-lg"
      >
        Back to News
      </Button>
    </div>
  );
};

export default Error;
