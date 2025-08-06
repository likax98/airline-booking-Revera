export interface FlightDestination {
  code: string;
  country: string;
  city: string;
  airportName: string;
  // Sunday = 0 ... Saturday = 6
  availableWeekdays: number[];
}