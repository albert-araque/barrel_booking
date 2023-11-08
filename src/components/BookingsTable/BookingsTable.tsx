import React, { useState } from "react";
import {
  Table,
  Box,
  Button,
  Switch,
  Paper,
  ActionIcon,
  Text,
} from "@mantine/core";
import {
  AiFillDelete as DeleteIcon,
  AiFillEdit as EditIcon,
} from "react-icons/ai";
import { IBooking } from "../../types";

interface BookingsTableProps {
  bookings: IBooking[];
  toggleNewModal: () => void;
  toggleEditModal: (bookingId: null | number) => void;
  toggleDeleteModal: (bookingId: null | number) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  toggleNewModal,
  toggleEditModal,
  toggleDeleteModal,
}) => {
  const [showDeleted, setShowDeleted] = useState(false);

  const showBookings = () => {
    const filteredBookings = bookings.filter((booking) => {
      if (!showDeleted) return booking.status !== "Deleted";
      return true;
    });

    return filteredBookings.map((booking) => (
      <Table.Tr key={booking.id}>
        <Table.Td>{booking.id}</Table.Td>
        <Table.Td>{booking.description}</Table.Td>
        <Table>{booking.street || "-----"}</Table>
        <Table.Td>{booking.status}</Table.Td>
        <Table.Td>{new Date(booking.createdAt).toLocaleDateString()}</Table.Td>
        <Table.Td>
          {booking.deletedAt
            ? new Date(booking.deletedAt).toLocaleDateString()
            : "-----"}
        </Table.Td>
        <Table.Td style={{ display: "flex", gap: "8px" }}>
          <ActionIcon
            aria-label="Edit booking"
            onClick={() => toggleEditModal(booking.id)}
            color="#99F5F2"
          >
            <EditIcon color="black" />
          </ActionIcon>
          <ActionIcon
            aria-label="Delete"
            onClick={() => toggleDeleteModal(booking.id)}
            disabled={!!booking.deletedAt}
            color="#b80d1d"
          >
            <DeleteIcon />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <Box className="tableContainer">
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
        <Button
          variant="filled"
          color="#99F5F2"
          onClick={() => toggleNewModal()}
        >
          <Text c="black" fw={500}>
            New Booking
          </Text>
        </Button>
      </Box>
      <Paper shadow="md" radius="md" withBorder p="xl">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>DESCRIPTION</Table.Th>
              <Table.Th>STREET</Table.Th>
              <Table.Th>STATUS</Table.Th>
              <Table.Th>CREATED AT</Table.Th>
              <Table.Th>DELETED AT</Table.Th>
              <Table.Th>ACTIONS</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{showBookings()}</Table.Tbody>
        </Table>
      </Paper>
    </Box>
  );
};
