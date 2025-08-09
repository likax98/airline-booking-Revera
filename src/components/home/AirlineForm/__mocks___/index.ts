import { destinations } from "@/data";
import { FLIGHT_OPTIONS } from "@/components/home/AirlineForm/lib";
import type { BookingFormValuesType } from "@/components/home/AirlineForm/lib";

const [country1, country2] = destinations;

export const mockCities = [country1.city, country2.city];
export const mockOptions = ["Option 1", "Option 2", "Option 3"];

export const bookingFormDefaultValues: BookingFormValuesType = {
  origin: mockCities[0],
  destination: mockCities[1],
  type: FLIGHT_OPTIONS[0],
  fromDate: new Date(),
  toDate: new Date(),
};
