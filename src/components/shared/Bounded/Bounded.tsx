import { cn } from "@/lib/utils/classnames";

import { TEST_IDS } from "../lib/constants";

interface Props {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  ...props
}: Props): JSX.Element => (
  <Comp
    className={cn("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
    data-testid={TEST_IDS.BOUNDED_WRAPPER}
    {...props}>
    <div className="w-full max-w-6xl mx-auto">{children}</div>
  </Comp>
);
