import React from "react";
import { Modal, Box, Text } from "@mantine/core";
import { ModalButtons } from "../ModalButtons/ModalButtons";

interface DeleteBookingModalProps {
  open: boolean;
  onClose: () => void;
  currentBooking: null | number;
}

export const DeleteBookingModal: React.FC<DeleteBookingModalProps> = ({
  open,
  onClose,
  //   currentBooking,
}) => {
  const deleteBooking = () => {
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose} centered withCloseButton={false}>
      <Box className="modal">
        <Text size="xl">Are you sure you want to delete this booking?</Text>
        <ModalButtons
          primary="Delete"
          onCancel={onClose}
          onPrimary={deleteBooking}
          primaryColor="#b80d1d"
        />
      </Box>
    </Modal>
  );
};
