import { Booking } from "./types";
import { createServer, Factory, Model } from "miragejs";
import { fakerES } from "@faker-js/faker";

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      booking: Model,
    },

    factories: {
      booking: Factory.extend<Booking>({
        id: undefined,
        status: "Pending",
        createdAt: new Date(),
        deletedAt: new Date(),
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
    },
  });

  return server;
}
