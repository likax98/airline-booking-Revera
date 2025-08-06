import { render, fireEvent, RenderResult } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";

import { formatLabeledText } from "@/lib/utils/strings";
import type { BookingFormValuesType } from "@/components/home/AirlineForm/lib";
import { getRoutesConfig } from "@/components/home/AirlineForm/lib/utils";
import { mockCities } from "@/components/home/AirlineForm/__mocks___";

import { RouteFields } from "./RouteFields";

const [origin, destination] = mockCities;

const config = getRoutesConfig({
  cities: mockCities,
  origin,
  destination,
});
const [originConfig, destinationConfig] = config;

const TestWrapper = ({
  origin,
  destination,
}: Partial<
  Pick<BookingFormValuesType, "origin" | "destination">
>): JSX.Element => {
  const form = useForm<BookingFormValuesType>();

  return (
    <FormProvider {...form}>
      <RouteFields
        control={form.control}
        cities={mockCities}
        {...{ origin, destination }}
      />
    </FormProvider>
  );
};

const renderComponent = (
  props?: Partial<Pick<BookingFormValuesType, "origin" | "destination">>
): RenderResult => render(<TestWrapper {...props} />);

const openSelect = (view: RenderResult, label: string): HTMLElement => {
  const trigger = view.getByText(formatLabeledText("Select", label));

  fireEvent.click(trigger);

  return trigger;
};

const selectCity = (view: RenderResult, city: string): void => {
  fireEvent.click(view.getByText(city));
};

describe("LocationFields", () => {
  it("renders 'origin' and 'destination' field labels", () => {
    const { getByText } = render(<TestWrapper {...{ destination }} />);

    config.forEach(({ label }) => {
      expect(getByText(label)).toBeInTheDocument();
    });
  });

  it("renders correct 'origin' options (excludes 'destination')", () => {
    const view = renderComponent({ destination: destination });
    openSelect(view, originConfig.label);

    const expected = mockCities.filter((city) => city !== destination);

    expected.forEach((city) => {
      expect(view.getByText(city)).toBeInTheDocument();
    });
  });

  it("renders correct 'destination' options after selecting 'origin'", () => {
    const view = renderComponent();

    openSelect(view, originConfig.label);
    selectCity(view, origin);
    openSelect(view, destinationConfig.label);

    const expected = mockCities.filter((city) => city !== origin);

    expected.forEach((city) => {
      expect(view.getByText(city)).toBeInTheDocument();
    });
  });

  it("does not render 'destination' options when origin is missing", () => {
    const { queryByText } = renderComponent({ origin: undefined });

    mockCities.forEach((city) => {
      expect(queryByText(city)).not.toBeInTheDocument();
    });
  });
});
