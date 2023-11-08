/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { LoadingOverlay, Select, TextInput, Box } from "@mantine/core";
import { ModalButtons } from "../ModalButtons/ModalButtons";
import { IFormData, IStatusOptions } from "../../types";

interface BookingFormProps {
  primary: string;
  value?: object;
  onClose: Function;
  onSubmit?: (data: IFormData) => void;
  isLoading?: boolean;
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

export const BookingForm: React.FC<BookingFormProps> = ({
  primary,
  value,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const { control, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmitHandler = (data: IFormData) => {
    if (onSubmit) onSubmit(data);
    reset(DEFAULT_VALUES);
    onClose();
  };

  const onCancelHandler = () => {
    reset(DEFAULT_VALUES);
    onClose();
  };

  useEffect(() => {
    reset(value);
  }, [value, reset]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Box className="modal">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextInput label="Description" size="sm" required {...field} />
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
            <Select data={STATUS_OPTIONS} label="Status" size="sm" {...field} />
          )}
        />
        <ModalButtons
          primary={primary}
          onCancel={onCancelHandler}
          primaryTextColor="black"
          isForm
        />
      </Box>
      {isLoading && (
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}
    </form>
  );
};
