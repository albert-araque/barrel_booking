export type Status = "Pending" | "Confirmed" | "Cancelled" | "Deleted";

export interface IBooking {
  id: number | null;
  status: Status;
  createdAt: Date;
  deletedAt: Date | undefined;
  description: string;
  street: string;
}

export interface IFormData {
  description: string;
  street: string;
  status: Status;
}

export interface IStatusOptions {
  value: Status;
  label: string;
}
