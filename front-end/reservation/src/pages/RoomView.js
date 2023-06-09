import { Button, Col, Divider, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../service/RoomService";
import RoomCard from "../components/RoomCard";
import { useTranslation } from "react-i18next";
export default function RoomView() {
  const [rooms, setRooms] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    updateRooms();
    return () => {};
  }, []);

  function updateRooms() {
    getAllRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error(t("messages.error"));
        return err;
      });
  }
  return (
    <>
      <Divider orientation="left">{t("rooms.divider")}</Divider>
      <Row gutter={[16, 16]} justify="center">
        <Col span={10}>
          <Link to={"create"}>
            <Button block type="primary">
              {t("rooms.createNewButton")}
            </Button>
          </Link>
        </Col>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col xs={24} sm={12} lg={8} key={room.id}>
            <Link to={`${room.id}`}>
              <RoomCard room={room} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
