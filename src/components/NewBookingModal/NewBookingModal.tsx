import React from "react";
import { Modal } from "@mantine/core";
import { IFormData } from "../../types";
import { BookingForm } from "../BookingForm/BookingForm";

interface NewBookingModalProps {
  open: boolean;
  onClose: () => void;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  open,
  onClose,
}) => {
  const onSubmit = (data: IFormData) => {
    console.log("Creando booking", data);
  };

  return (
    <Modal opened={open} onClose={onClose} centered withCloseButton={false}>
      <BookingForm onSubmit={onSubmit} onClose={onClose} primary="Create" />
    </Modal>
  );
};
