import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Select, TextInput, Modal, Box, Button } from "@mantine/core";
import { IFormData, IStatusOptions, Status } from "../../types";

interface NewBookingModalProps {
  open: boolean;
  onClose: () => void;
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
  status: "Pending" as Status,
};

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  open,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<IFormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: IFormData) => {
    console.log(data);
    reset(DEFAULT_VALUES);
    onClose();
  };

  const onCancel = () => {
    reset(DEFAULT_VALUES);
    onClose();
  };

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
            <Button type="submit">Create</Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};
