import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/classnames";

interface Props {
  className?: string;
}

// You can see how it looks in Storybook
export const Spinner = ({ className }: Props): JSX.Element => (
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
