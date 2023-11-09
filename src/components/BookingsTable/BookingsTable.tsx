import React, { useState } from "react";
import { Table, Box, Paper, ActionIcon, Badge } from "@mantine/core";
import {
  AiFillDelete as DeleteIcon,
  AiFillEdit as EditIcon,
} from "react-icons/ai";
import { IBooking, Status } from "../../types";
import { TableControls } from "./components/TableControls/TableControls";

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

  const getStatusBadge = (status: Status) => {
    let color = "";
    if (status === "Confirmed") color = "#5cbc6a";
    if (status === "Pending") color = "#e0914b";
    if (status === "Cancelled") color = "#d13b3b";
    if (status === "Deleted") color = "#212b3d";

    return (
      <Badge radius="sm" color={color}>
        {status}
      </Badge>
    );
  };

  const showBookings = () => {
    if (bookings.length === 0) return;
    const filteredBookings = bookings.filter((booking) => {
      if (!showDeleted) return booking.status !== "Deleted";
      return true;
    });

    return filteredBookings.map((booking) => (
      <Table.Tr key={booking.id}>
        <Table.Td>{booking.id}</Table.Td>
        <Table.Td>{booking.description}</Table.Td>
        <Table.Td>{booking.street || "-----"}</Table.Td>
        <Table.Td>{getStatusBadge(booking.status)}</Table.Td>
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
            disabled={booking.status === "Deleted"}
            color="#99F5F2"
          >
            <EditIcon color="black" />
          </ActionIcon>
          <ActionIcon
            aria-label="Delete"
            onClick={() => toggleDeleteModal(booking.id)}
            disabled={booking.status === "Deleted"}
            color="#ad0918"
          >
            <DeleteIcon />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <Box className="tableContainer">
      <TableControls
        showDeleted={showDeleted}
        setShowDeleted={setShowDeleted}
        toggleNewModal={toggleNewModal}
      />
      <Paper
        shadow="xl"
        radius="md"
        withBorder
        p="xl"
        style={{ backgroundColor: "#2d303e" }}
      >
        <Table>
          <Table.Thead style={{ backgroundColor: "#2d303e" }}>
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
