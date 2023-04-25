import { Button, Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../service/RoomService";
import RoomCard from "../components/RoomCard";
export default function RoomView() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    updateRooms();
    return () => {};
  }, []);

  function updateRooms() {
    getAllRooms().then((res) => {
      setRooms(res.data);
    });
  }
  return (
    <>
      <Divider orientation="left">Rooms</Divider>
      <Row gutter={[16, 16]} justify="center">
        <Col span={10}>
          <Link to={"create"}>
            <Button block type="primary">
              Create new
            </Button>
          </Link>
        </Col>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col span={6}>
            <Link to={`${room.id}`}>
              <RoomCard room={room} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
