import { Col, Divider, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReservationCard from "../components/ReservationCard";
import { getReservations } from "../service/ReservationService";

export default function RoomReservations() {
  const [reservations, setReservations] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchReservations();

    return () => {};
  }, []);

  return (
    <>
      <Divider orientation="left">{t("reservations.divider")}</Divider>
      <Row gutter={[16, 16]}>
        {reservations.map((reservation) => (
          <Col xs={24} sm={12} lg={8} key={reservation.id}>
            <ReservationCard
                reservation={reservation}
                onRevoke={() => {
                  fetchReservations();
                }}
              />
          </Col>
        ))}
      </Row>
    </>
  );

  function fetchReservations() {
    getReservations().then((res) => {
      setReservations(res.data);
    }).catch((err) => {
      console.log(err);
      message.error(t("messages.error"));
      return err;
    });;
  }
}
