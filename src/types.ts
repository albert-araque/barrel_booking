export type Status = "Pending" | "Confirmed" | "Cancelled" | "Deleted";

export interface Booking {
  id: number | null | undefined;
  status: Status;
  createdAt: Date;
  deletedAt: Date;
  description: string;
  street: string;
}
