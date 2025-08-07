import { Spinner } from "./Spinner";

export default {
  title: "Shared/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A loading indicator component used as a fallback in Suspense or loading states",
      },
    },
  },
};

export const Default = () => <Spinner />;
