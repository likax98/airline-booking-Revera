import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/className";

interface Props {
  className?: string;
}

// A loading indicator component used as a fallback in Suspense or loading states
// You can see how it looks in Storybook
export const Spinner = ({ className }: Props) => (
  <div
    role="status"
    aria-live="polite"
    className={cn(
      "min-h-screen flex items-center justify-center py-20",
      className
    )}>
    <Loader2 className="h-20 w-20 animate-spin text-muted-foreground" />
    <span className="sr-only">Loading form...</span>
  </div>
);
