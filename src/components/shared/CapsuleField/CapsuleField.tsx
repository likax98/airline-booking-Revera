import { cn } from "@/lib/utils/className";
import { Label } from "@/components/ui/label";

interface Props {
  className?: string;
  label: string;
  children: React.ReactNode;
}

export const CapsuleField = ({ className, label, children }: Props): JSX.Element => (
  <div className="relative w-full h-14 min-w-60 group focus-within:text-black">
    <Label
      className={cn(
        "absolute -top-2 left-4",
        "px-1",
        "text-sm font-light text-muted-foreground",
        "bg-white",
        "transition-colors duration-300 ease-in-out",
        "group-hover:text-black group-focus-within:text-black",
        className
      )}>
      {label}
    </Label>
    {children}
  </div>
);
