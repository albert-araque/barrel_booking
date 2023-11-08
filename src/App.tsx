import { useEffect, useState } from "react";
import "./App.css";
import { Booking } from "./types";
import { BookingsTable } from "./components/BookingsTable/BookingsTable";

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const getAllBookings = async () => {
    const response = await fetch("/api/bookings");
    const bookings = await response.json();

    setBookings(bookings);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <>
      <h1>Booking CRUD</h1>
      <BookingsTable bookings={bookings} />
    </>
  );
}

export default App;
