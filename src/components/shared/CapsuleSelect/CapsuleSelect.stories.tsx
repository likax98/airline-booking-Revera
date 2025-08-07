import { useState } from "react";

import { mockOptions } from "@/components/home/AirlineForm/__mocks___";

import { CapsuleSelect } from "./CapsuleSelect";

export default {
  title: "Shared/CapsuleSelect",
  component: CapsuleSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A capsule-shaped dropdown select with dynamic options",
      },
    },
  },
};

export const Default = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-80">
      <CapsuleSelect
        label="Default"
        options={mockOptions}
        onChange={setValue}
        {...{ value }}
      />
    </div>
  );
};

export const Preselected = () => {
  const [value, setValue] = useState(mockOptions[0]);

  return (
    <div className="w-80">
      <CapsuleSelect
        label="Preselected"
        options={mockOptions}
        onChange={setValue}
        {...{ value }}
      />
    </div>
  );
};

export const NoOptions = () => (
  <div className="w-80">
    <CapsuleSelect label="Empty" options={[]} value="" onChange={() => {}} />
  </div>
);
