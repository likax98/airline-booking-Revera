import { Bounded } from "./Bounded";

export default {
  title: "Shared/Bounded",
  component: Bounded,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The layout container that adds consistent horizontal padding and centers content with a max width",
      },
    },
  },
};

export const Default = () => (
  <Bounded>
    <p className="text-gray-700">This is the default bounded layout.</p>
  </Bounded>
);

export const AsMainTag = () => (
  <Bounded as="main">
    <p>
      This content is wrapped in a &lt;main&gt; tag instead of &lt;section&gt;.
    </p>
  </Bounded>
);

export const WithCustomClass = () => (
  <Bounded className="bg-blue-100 border border-blue-300 rounded p-4">
    <p>This version includes extra background and border styling.</p>
  </Bounded>
);
