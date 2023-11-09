import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "@mantine/core";
import { BookingForm } from "../BookingForm/BookingForm";
import { IBooking, IFormData } from "../../types";
import {
  editBooking,
  getBooking as getBookingService,
} from "../../services/bookingService";

interface EditBookingModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  currentBooking: null | number;
}

export const EditBookingModal: React.FC<EditBookingModalProps> = ({
  open,
  onClose,
  onUpdate,
  currentBooking,
}) => {
  const [bookingEdited, setBookingEdited] = useState({});

  const getBooking = useCallback(async () => {
    if (!currentBooking) return;
    const bookingEdited = (await getBookingService(currentBooking)) as IBooking;

    setBookingEdited(bookingEdited);
  }, [currentBooking]);

  const isEmpty = (object: object) => {
    return Object.keys(object).length === 0;
  };

  const onSubmit = async (data: IFormData) => {
    const updatedBooking = await editBooking(data);

    if (updatedBooking) onUpdate();
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
