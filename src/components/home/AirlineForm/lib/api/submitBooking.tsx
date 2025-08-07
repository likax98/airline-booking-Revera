import { toast } from "@/hooks/use-toast";

import type { BookingFormValuesType } from "../types";
import { ERROR_MESSAGES, MESSAGES } from "../constants";

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
    className: "bg-green-600 text-white border-green-700",
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
  });
};

const showErrorToast = (message: string): void => {
  toast({
    title: ERROR_MESSAGES.BOOKING_FAILED,
    description: message || ERROR_MESSAGES.GENERIC_ERROR,
    variant: "destructive",
  });
};
