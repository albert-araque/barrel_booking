/* eslint-disable @typescript-eslint/ban-types */
import {
  Registry,
  ModelDefinition,
  FactoryDefinition,
  Assign,
  FlattenFactoryMethods,
} from "miragejs/-types";
import { Server } from "miragejs/server";
import { makeServer } from "../src/server";
import {
  createBooking,
  deleteBooking,
  editBooking,
  getBooking,
} from "../src/services/bookingService";
import { IBooking, IFormData } from "../src/types";

let server: Server<
  Registry<
    { booking: ModelDefinition<{}> },
    { booking: FactoryDefinition<Assign<{}, FlattenFactoryMethods<IBooking>>> }
  >
>;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  server.shutdown();
});

describe("deleteBooking", () => {
  test("should delete existing booking", async () => {
    const bookingId = 1;
    const deletedBooking = await deleteBooking(bookingId);

    const result = deletedBooking.id;
    const expectedResut = "1";

    expect(result).toEqual(expectedResut);
  });

  test("should fail to delete booking", async () => {
    const bookingId = 100;
    const deletedBooking = await deleteBooking(bookingId);

    const result = deletedBooking.id;
    const expectedResut = undefined;

    expect(result).toEqual(expectedResut);
  });
});

describe("editBooking", () => {
  test("should edit existing booking", async () => {
    const bookingId = 1;
    const bookingToEdit = (await getBooking(bookingId)) as IBooking;
    bookingToEdit.description = "Description changed";
    bookingToEdit.status = "Confirmed";
    bookingToEdit.street = "Calle de la piruleta";

    const result = await editBooking(bookingToEdit as IFormData);
    const expectedResult = bookingToEdit;

    expect(result).toEqual(expectedResult);
  });
});

describe("getBooking", () => {
  test("should get existing booking", async () => {
    const bookingId = 1;
    const booking = (await getBooking(bookingId)) as IBooking;

    const result = booking.id;
    const expectedResult = "1";

    expect(result).toEqual(expectedResult);
  });

  test("should fail to get booking", async () => {
    const bookingId = 100;
    const result = await getBooking(bookingId);

    const expectedResult = null;

    expect(result).toEqual(expectedResult);
  });
});

describe("createBooking", () => {
  test("should create booking", async () => {
    const bookingToCreate = {
      description: "Booking description",
      status: "Confirmed",
      street: "Calle real",
    };
    const booking = await createBooking(bookingToCreate as IFormData);

    const result = booking.id;
    const expectedResult = "5";

    expect(result).toEqual(expectedResult);
  });
});
