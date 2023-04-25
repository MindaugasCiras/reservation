import { client } from "../config/axios";

export const bookRoom = (req) => {
  return client.post("/reservations", req);
};
export const getReservations = () => {
  return client.get("/reservations");
};
export const revokeReservation = (id) => {
  return client.delete("/reservations/" + id);
};
