import React from "react";
import { Modal, Box, Text, Button } from "@mantine/core";

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
        <Box className="buttonRow">
          <Button onClick={onClose} variant="outline" color="gray">
            Cancel
          </Button>
          <Button onClick={deleteBooking} variant="filled" color="#b80d1d">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
