"use client";

import { Button } from "@/components/ui";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className=" max-w-md text-xl font-bold text-destructive text-center capitalize">
        {process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong. Please try again later."}
      </h1>
      <Button variant="outline" size="lg" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
