import React from "react";
import { Modal, Box, Text } from "@mantine/core";
import { ModalButtons } from "../ModalButtons/ModalButtons";
import { deleteBooking as deleteBookingService } from "../../services/bookingService";

interface DeleteBookingModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  currentBooking: null | number;
}

export const DeleteBookingModal: React.FC<DeleteBookingModalProps> = ({
  open,
  onClose,
  onDelete,
  currentBooking,
}) => {
  const deleteBooking = async () => {
    const deletedBooking = await deleteBookingService(currentBooking);
    if (deletedBooking) onDelete();
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
