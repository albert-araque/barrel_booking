import { IBooking } from "./types";
import { createServer, Factory, Model } from "miragejs";
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
        const attrs = JSON.parse(request.requestBody);

        return schema.create("booking", attrs);
      });
    },
  });

  return server;
}
