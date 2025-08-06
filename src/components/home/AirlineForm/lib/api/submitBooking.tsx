import { toast } from "@/hooks/use-toast";

import type { BookingFormValuesType } from "../types";
import { MESSAGES } from "../constants";

/**
 * Submits a booking request to the API and triggers toast notifications
 */
export const submitBooking = async (
  data: BookingFormValuesType
): Promise<void> => {
  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        fromDate: data.fromDate?.toISOString(),
        toDate: data.toDate?.toISOString(),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      showErrorToast(result.error);

      return;
    }

    showSuccessToast(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Please try again later.";

    showErrorToast(message);
  }
};

const showSuccessToast = (result: {
  bookingId: string;
  status: string;
  timestamp: string;
}): void => {
  toast({
    title: MESSAGES.BOOKING_CONFIRMED,
    description: (
      <div className="space-y-1">
        <p className="text-md font-semibold">Status: {result.status}</p>
        <p className="text-md font-semibold">ID: {result.bookingId}</p>
        <p className="text-md font-semibold">Timestamp: {result.timestamp}</p>
        <p className="text-yellow-400 font-semibold text-lg">
          ⚠️ We hope airplane won&apos;t crash! Happy Flight!
        </p>
      </div>
    ),
    className: "bg-green-600 text-white border-green-700",
  });
};

const showErrorToast = (message: string): void => {
  toast({
    title: MESSAGES.BOOKING_FAILED,
    description: message || MESSAGES.GENERIC_ERROR,
    variant: "destructive",
  });
};
