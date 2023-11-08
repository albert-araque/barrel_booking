import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "@mantine/core";
import { BookingForm } from "../BookingForm/BookingForm";
import { IFormData } from "../../types";

interface EditBookingModalProps {
  open: boolean;
  onClose: () => void;
  currentBooking: null | number;
}

export const EditBookingModal: React.FC<EditBookingModalProps> = ({
  open,
  onClose,
  currentBooking,
}) => {
  const [bookingEdited, setBookingEdited] = useState({});

  const getBooking = useCallback(async () => {
    if (!currentBooking) return;
    const response = await fetch(`/api/booking/${currentBooking}`);
    const { booking } = await response.json();

    setBookingEdited(booking);
  }, [currentBooking]);

  const isEmpty = (object: object) => {
    return Object.keys(object).length === 0;
  };

  const onSubmit = (data: IFormData) => {
    console.log("editando booking", data);
  };

  const onCloseHandler = () => {
    setBookingEdited({});
    onClose();
  };

  useEffect(() => {
    getBooking();
  }, [getBooking]);

  return (
    <Modal
      opened={open}
      onClose={onCloseHandler}
      centered
      withCloseButton={false}
    >
      <BookingForm
        primary="Edit"
        value={bookingEdited}
        onSubmit={onSubmit}
        onClose={onCloseHandler}
        isLoading={isEmpty(bookingEdited)}
      />
    </Modal>
  );
};
