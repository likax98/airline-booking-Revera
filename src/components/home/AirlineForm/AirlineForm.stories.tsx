import { destinations } from "@/data";

import { AirlineForm } from "./AirlineForm";

export default {
  title: "Home/AirlineForm",
  component: AirlineForm,
  parameters: {
    layout: "centered",
  },
};

export const Default = () => <AirlineForm {...{ destinations }} />;
