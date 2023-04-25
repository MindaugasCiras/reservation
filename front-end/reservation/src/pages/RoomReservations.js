import { Col, Divider, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ReservationCard from "../components/ReservationCard";
import RoomCard from "../components/RoomCard";
import { getReservations } from "../service/ReservationService";

export default function RoomReservations() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    fetchReservations();

    return () => {};
  }, []);

  return (
    <>
      <Divider orientation="left">Reservations</Divider>
      <Row gutter={[16, 16]}>
        {reservations.map((reservation) => (
          <Col span={6} key={reservation.id}>
            <Space direction="vertical">
              <ReservationCard
                reservation={reservation}
                onRevoke={() => {
                  fetchReservations();
                }}
              />
            </Space>
          </Col>
        ))}
      </Row>
    </>
  );

  function fetchReservations() {
    getReservations().then((res) => {
      setReservations(res.data);
    });
  }
}
