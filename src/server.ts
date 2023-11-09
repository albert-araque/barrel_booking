import { IBooking } from "./types";
import { createServer, Factory, Model, Response } from "miragejs";
import { fakerES } from "@faker-js/faker";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      booking: Model,
    },

    factories: {
      booking: Factory.extend<IBooking>({
        id: null,
        status: "Pending",
        createdAt: new Date(),
        deletedAt: undefined,
        description: "",
        street: "",
      }),
    },

    seeds(server) {
      server.create("booking", {
        status: "Pending",
        street: fakerES.location.street(),
        description: "Habitación doble con vista al mar",
        createdAt: new Date(),
      });
      server.create("booking", {
        status: "Confirmed",
        street: fakerES.location.street(),
        description: "Suite de lujo con jacuzzi",
        createdAt: new Date(),
      });
      server.create("booking", {
        status: "Deleted",
        street: fakerES.location.street(),
        description: "Habitación estándar con desayuno incluido",
        createdAt: new Date(),
        deletedAt: new Date(),
      });
      server.create("booking", {
        status: "Cancelled",
        street: fakerES.location.street(),
        description: "Bungalow junto a la piscina",
        createdAt: new Date(),
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/bookings", (schema) => {
        return schema.all("booking").models;
      });

      this.get("/booking/:id", (schema, request) => {
        const id = request.params.id;
        return schema.find("booking", id);
      });

      this.post("/booking", (schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody);
          attrs.createdAt = new Date();
          return schema.create("booking", attrs);
        } catch (error) {
          return new Response(500);
        }
      });

      this.put("/booking/edit/", (schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody);
          const bookingId = attrs.id;
          const bookingToUpdate = schema.find("booking", bookingId);

          if (!bookingToUpdate) return new Response(204);
          bookingToUpdate.update("description", attrs.description);
          bookingToUpdate.update("street", attrs.street);
          bookingToUpdate.update("status", attrs.status);
          return new Response(200, undefined, bookingToUpdate);
        } catch (error) {
          return new Response(500);
        }
      });

      this.put("/booking/delete/:id", (schema, request) => {
        try {
          const bookingId = request.params.id;
          const bookingToDelete = schema.find("booking", bookingId);

          if (!bookingToDelete) return new Response(204);
          bookingToDelete.update("deletedAt", new Date());
          bookingToDelete.update("status", "Deleted");
          return new Response(200, undefined, bookingToDelete);
        } catch (error) {
          return new Response(500);
        }
      });
    },
  });

  return server;
}
