import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Booking } from "../../types";

interface BookingsTableProps {
  bookings: Booking[];
}

export const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
  const [showDeleted] = useState(false);

  const showBookings = () => {
    const filteredBookings = bookings.filter((booking) => {
      if (!showDeleted) return booking.status !== "Deleted";
      return true;
    });

    return filteredBookings.map((booking) => (
      <TableRow
        key={booking.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {booking.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {booking.description}
        </TableCell>
        <TableCell component="th" scope="row">
          {booking.street}
        </TableCell>
        <TableCell component="th" scope="row">
          {booking.status}
        </TableCell>
        <TableCell component="th" scope="row">
          {new Date(booking.createdAt).toLocaleDateString()}
        </TableCell>
        {showDeleted && (
          <TableCell component="th" scope="row">
            {new Date(booking.deletedAt).toLocaleDateString()}
          </TableCell>
        )}
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Street</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created at</TableCell>
            {showDeleted && <TableCell>Deleted at</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>{showBookings()}</TableBody>
      </Table>
    </TableContainer>
  );
};
