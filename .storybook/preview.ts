import type { Preview } from "@storybook/nextjs";

import "../src/app/globals.css";

import { withMockFlightDateFieldContext } from "./decorators";

const preview: Preview = {
  parameters: {
    tags: ["autodocs"],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      router: {
        basePath: "/",
      },
    },
  },
  decorators: [withMockFlightDateFieldContext],
};

export default preview;
