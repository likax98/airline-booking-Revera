import { CapsuleField } from "./CapsuleField";

export default {
  title: "Shared/CapsuleField",
  component: CapsuleField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "CapsuleField component is a styled field container with a floating label and children.",
      },
    },
  },
};

export const Default = () => (
  <CapsuleField label="Email">
    <input className="h-full" type="email" placeholder="digido@airlines.com" />
  </CapsuleField>
);

export const WithCustomInput = () => (
  <CapsuleField label="Username">
    <input
      className="h-full w-full px-4 py-2 border border-gray-300 rounded"
      type="text"
      placeholder="custom input"
    />
  </CapsuleField>
);

export const FocusedState = () => (
  <div className="w-80">
    <CapsuleField label="Password">
      <input
        className="h-full"
        type="password"
        defaultValue="secret"
        autoFocus
      />
    </CapsuleField>
  </div>
);
