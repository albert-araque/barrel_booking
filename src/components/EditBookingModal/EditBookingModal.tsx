import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  LoadingOverlay,
  Select,
  TextInput,
  Modal,
  Box,
  Button,
} from "@mantine/core";
import { IFormData, IStatusOptions } from "../../types";

interface EditBookingModalProps {
  open: boolean;
  onClose: () => void;
  currentBooking: null | number;
}
const STATUS_OPTIONS: IStatusOptions[] = [
  { value: "Pending", label: "Pending" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Deleted", label: "Deleted" },
];

const DEFAULT_VALUES = {
  description: "",
  street: "",
  status: undefined,
};

export const EditBookingModal: React.FC<EditBookingModalProps> = ({
  open,
  onClose,
  currentBooking,
}) => {
  const [bookingEdited, setBookingEdited] = useState({});
  const { control, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const isEmpty = (object: object) => {
    return Object.keys(object).length === 0;
  };

  const onSubmit = (data: IFormData) => {
    console.log(data);
    reset(DEFAULT_VALUES);
    setBookingEdited({});
    onClose();
  };

  const onCancel = () => {
    reset(DEFAULT_VALUES);
    setBookingEdited({});
    onClose();
  };

  const getBooking = useCallback(async () => {
    const response = await fetch(`/api/booking/${currentBooking}`);
    const { booking } = await response.json();

    setBookingEdited(booking);
  }, [currentBooking]);

  useEffect(() => {
    getBooking();
  }, [getBooking]);

  useEffect(() => {
    reset(bookingEdited);
  }, [bookingEdited, reset]);

  return (
    <Modal opened={open} onClose={onCancel} centered withCloseButton={false}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="modal">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextInput label="Description" size="sm" {...field} />
            )}
          />
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <TextInput label="Street" size="sm" {...field} />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                data={STATUS_OPTIONS}
                label="Status"
                size="sm"
                {...field}
              />
            )}
          />
          <Box className="buttonRow">
            <Button onClick={onCancel} variant="outline" color="gray">
              Cancel
            </Button>
            <Button type="submit">Edit</Button>
          </Box>
        </Box>
        {isEmpty(bookingEdited) && (
          <LoadingOverlay
            visible
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        )}
      </form>
    </Modal>
  );
};
