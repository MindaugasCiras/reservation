import { client } from "../config/axios";

export const getAllRooms = () => {
  return client.get("/rooms");
};

export const getAvailableRooms = (dateFrom, dateTo) => {
  return client.get("/rooms", {
    params: {
      from: dateFrom,
      to: dateTo,
    },
  });
};

export const getRoom = (id) => {
  return client.get("/rooms/" + id);
};
export const deleteRoom = (id) => {
  return client.delete("/rooms/" + id);
};

export const updateRoom = (id, room) => {
  return client.put("/rooms/" + id, room);
};
export const createRoom = (room) => {
  return client.post("/rooms", room);
};
