import React, { useEffect, useState } from "react";
import { IBooking } from "./types";
import { BookingsTable } from "./components/BookingsTable/BookingsTable";
import { DeleteBookingModal } from "./components/DeleteBookingModal/DeleteBookingModal";
import { EditBookingModal } from "./components/EditBookingModal/EditBookingModal";
import { NewBookingModal } from "./components/NewBookingModal/NewBookingModal";
import { Box, Image } from "@mantine/core";
import "./App.css";
import bookingLogo from "./assets/booking_logo.png";

function App() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [openNewModal, setOpenNewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<null | number>(null);

  const getAllBookings = async () => {
    const response = await fetch("/api/bookings");
    const bookings = await response.json();

    setBookings(bookings);
  };

  const toggleNewModal = () => {
    setOpenNewModal(!openNewModal);
  };

  const toggleEditModal = (bookingId: null | number) => {
    setCurrentBooking(bookingId);
    setOpenEditModal(!openEditModal);
  };

  const toggleDeleteModal = (bookingId: null | number) => {
    setCurrentBooking(bookingId);
    setOpenDeleteModal(!openDeleteModal);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <Box className="appContainer">
      <Image
        alt="BooKing logo"
        src={bookingLogo}
        w={500}
        h={"auto"}
        style={{ margin: "0 auto" }}
      />
      <NewBookingModal open={openNewModal} onClose={() => toggleNewModal()} />
      <DeleteBookingModal
        open={openDeleteModal}
        onClose={() => toggleDeleteModal(null)}
        currentBooking={currentBooking}
      />
      <EditBookingModal
        open={openEditModal}
        onClose={() => toggleEditModal(null)}
        currentBooking={currentBooking}
      />
      <BookingsTable
        bookings={bookings}
        toggleNewModal={toggleNewModal}
        toggleEditModal={toggleEditModal}
        toggleDeleteModal={toggleDeleteModal}
      />
    </Box>
  );
}

export default App;
