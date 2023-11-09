import React from "react";
import { Modal } from "@mantine/core";
import { IFormData } from "../../types";
import { BookingForm } from "../BookingForm/BookingForm";
import { createBooking } from "../../services/bookingService";

interface NewBookingModalProps {
  open: boolean;
  onClose: () => void;
  onNew: () => void;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  open,
  onClose,
  onNew,
}) => {
  const onSubmit = async (data: IFormData) => {
    const createdBooking = await createBooking(data);

    if (createdBooking) onNew();
  };

  return (
    <Modal opened={open} onClose={onClose} centered withCloseButton={false}>
      <BookingForm onSubmit={onSubmit} onClose={onClose} primary="Create" />
    </Modal>
  );
};
