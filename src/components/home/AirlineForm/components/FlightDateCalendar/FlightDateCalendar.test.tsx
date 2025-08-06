import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";

import { destinations } from "@/data";
import {
  ARIA_LABELS,
  FLIGHT_OPTIONS,
  MESSAGES,
  TEST_IDS,
  FormFieldLabel,
  type BookingFormValuesType,
} from "@/components/home/AirlineForm/lib";

import { FlightDateCalendar } from "./FlightDateCalendar";
import { mockCities } from "../../__mocks___";

const mockSetActiveDateField = jest.fn();

jest.mock("../../context", () => ({
  useFlightDateField: () => ({
    activeDateField: undefined,
    setActiveDateField: mockSetActiveDateField,
  }),
}));

const [origin, destination] = mockCities;

interface TestComponentProps {
  className?: string;
  origin?: string;
  destination?: string;
  fromDate?: Date;
  toDate?: Date;
  activeDateField?: FormFieldLabel;
}

const TestComponent = ({
  origin,
  destination,
  fromDate,
  toDate,
}: TestComponentProps): JSX.Element => {
  const form = useForm<BookingFormValuesType>({
    defaultValues: {
      origin,
      destination,
      flightTypeOption: FLIGHT_OPTIONS[1],
      fromDate,
      toDate,
    },
  });

  return (
    <FormProvider {...form}>
      <FlightDateCalendar
        control={form.control}
        setValue={form.setValue}
        {...{ destinations }}
      />
    </FormProvider>
  );
};

const renderComponent = (props?: Partial<TestComponentProps>): RenderResult =>
  render(<TestComponent {...{ origin, destination }} {...props} />);

describe("FlightDateCalendar", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockSetActiveDateField.mockClear();
  });

  it("renders correctly", () => {
    const { getByTestId } = renderComponent();

    const calendar = getByTestId(TEST_IDS.FLIGHT_DATE_CALENDAR);

    expect(calendar).toBeInTheDocument();
  });

  it("hides calendar when 'activeDateField' is undefined on viewport lg and above", () => {
    const { getByTestId } = renderComponent({ activeDateField: undefined });

    const wrapper = getByTestId(TEST_IDS.FLIGHT_DATE_CALENDAR_WRAPPER);

    expect(wrapper).toHaveClass(
      "lg:opacity-0",
      "lg:invisible",
      "lg:pointer-events-none"
    );
  });

  it(`shows '${MESSAGES.SELECT_ORIGIN_AND_DESTINATION}' when origin/destination is missing`, () => {
    const { getByText } = renderComponent({
      origin: undefined,
      destination: undefined,
    });

    expect(
      getByText(MESSAGES.SELECT_ORIGIN_AND_DESTINATION)
    ).toBeInTheDocument();
  });

  it("calls 'setActiveDateField' when close button is clicked", async () => {
    const { getByLabelText } = renderComponent({
      activeDateField: FormFieldLabel.From,
    });

    const closeBtn = getByLabelText(ARIA_LABELS.CLOSE_CALENDAR);

    await user.click(closeBtn);

    expect(mockSetActiveDateField).toHaveBeenCalledWith(undefined);
  });

  it("selects a date and closes calendar", async () => {
    const { getByTestId } = renderComponent({
      className: "lg:opacity-100 lg:visible lg:pointer-events-auto",
      activeDateField: FormFieldLabel.From,
      fromDate: new Date("2025-08-5"),
      toDate: new Date("2025-08-7"),
    });

    const wrapper = getByTestId(TEST_IDS.FLIGHT_DATE_CALENDAR_WRAPPER);

    const today = new Date();
    const dayString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const day = wrapper.querySelector(`[data-day="${dayString}"]`)!;

    await user.click(day);
  });
});
