/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { Button, Box } from "@mantine/core";

interface ModalButtonsProps {
  primary?: string;
  cancel?: string;
  primaryColor?: string;
  primaryTextColor?: string;
  onPrimary?: Function;
  onCancel?: Function;
  isForm?: boolean;
}

export const ModalButtons: React.FC<ModalButtonsProps> = ({
  primary,
  cancel = "Cancel",
  primaryColor,
  primaryTextColor,
  onPrimary,
  onCancel,
  isForm = false,
}) => {
  const onCancelHandler = () => {
    if (onCancel) onCancel();
  };

  const onPrimaryHandler = () => {
    if (onPrimary) onPrimary();
  };

  return (
    <Box className="buttonRow">
      <Button onClick={onCancelHandler} variant="outline" color="gray">
        {cancel}
      </Button>
      <Button
        type={isForm ? "submit" : "button"}
        color={primaryColor || "#99F5F2"}
        c={primaryTextColor}
        onClick={onPrimaryHandler}
      >
        {primary}
      </Button>
    </Box>
  );
};
