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
        component:
          "CapsuleSelect component is a rounded dropdown select. It supports dynamic options, custom styling, and displays a placeholder when no selection is made.",
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
        onChange={setValue}
        options={mockOptions}
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
        onChange={setValue}
        options={mockOptions}
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
