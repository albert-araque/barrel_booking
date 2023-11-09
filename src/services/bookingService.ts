import { IBooking, IFormData } from "../types";

export const deleteBooking = async (bookingId: null | number) => {
  try {
    const response = await fetch(`/api/booking/delete/${bookingId}`, {
      method: "PUT",
    });
    const deletedBooking = await response.json();

    return deletedBooking.booking;
  } catch (err) {
    return err;
  }
};

export const listBookings = async (): Promise<IBooking[]> => {
  const response = await fetch("/api/bookings");
  const bookings = await response.json();
  return bookings;
};

export const getBooking = async (
  bookingId: number
): Promise<IBooking | null> => {
  const response = await fetch(`/api/booking/${bookingId}`);
  const booking = await response.json();

  if (booking) return booking.booking;
  return null;
};

export const editBooking = async (data: IFormData): Promise<IBooking> => {
  const response = await fetch("/api/booking/edit/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const updatedBooking = await response.json();
  return updatedBooking.booking;
};

export const createBooking = async (data: IFormData): Promise<IBooking> => {
  const response = await fetch("/api/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const createdBooking = await response.json();
  return createdBooking.booking;
};
