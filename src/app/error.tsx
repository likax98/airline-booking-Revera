"use client";

import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h2>Sorry, something went wrong.</h2>
      <button onClick={() => reset()}>Please, try again later.</button>
    </div>
  );
}
