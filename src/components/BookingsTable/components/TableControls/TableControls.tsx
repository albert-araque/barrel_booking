import React from "react";

import { Box, Button, Switch, Text } from "@mantine/core";

interface TableControlsProps {
  showDeleted: boolean;
  setShowDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  toggleNewModal: () => void;
}

export const TableControls: React.FC<TableControlsProps> = ({
  showDeleted,
  setShowDeleted,
  toggleNewModal,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Switch
        label="Show deleted"
        checked={showDeleted}
        onChange={(event) => {
          setShowDeleted(event.currentTarget.checked);
        }}
        color="#99F5F2"
      />
      <Button variant="filled" color="#99F5F2" onClick={() => toggleNewModal()}>
        <Text c="black" fw={500}>
          New Booking
        </Text>
      </Button>
    </Box>
  );
};
