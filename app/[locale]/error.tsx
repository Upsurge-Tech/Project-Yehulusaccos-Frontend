"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-[250px]">
        <h2 className="pb-3">Something went wrong!</h2>
        <p className="text-destructive text-sm ">{error.message}</p>
        <Button className="w-full" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
