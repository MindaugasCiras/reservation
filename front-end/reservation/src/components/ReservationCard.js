import { Button, Card, Col, message, Popconfirm, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import {
  UserOutlined,
  FullscreenOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import { revokeReservation } from "../service/ReservationService";
import { useTranslation } from "react-i18next";

export default function ReservationCard(props) {
  const { t } = useTranslation();
  const { reservation } = props;
  const room = reservation.room;
  return (
    <Card
      hoverable
      cover={
        imageExists(room.imageUrl) ? (
          <img alt="room_image" src={room.imageUrl} />
        ) : (
          <img
            alt="room_image"
            src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
          />
        )
      }
    >
      <Meta
        title={
          <Row justify={"space-between"}>
            <Col flex={"auto"}>{room.name}</Col>
            <Col>{reservation.price} $</Col>
          </Row>
        }
        description={
          <>
            <Space direction="horizontal">
              <Space>
                <UserOutlined />
                <span>{room.capacity}</span>
              </Space>
              |
              <Space>
                <FullscreenOutlined />
                <span>{room.sizeSqm} m2</span>
              </Space>
              |
              <Space>
                <BarcodeOutlined />
                <span>{room.bedCount}</span>
              </Space>
            </Space>
            <Row>
              <Col span={12}>{t("reservations.card.user")}</Col>
              <Col flex={"auto"}>{reservation.user.username}</Col>
            </Row>
            <Row>
              <Col span={12}>{t("reservations.card.fromDate")}</Col>
              <Col flex={"auto"}>{reservation.bookedFrom.split("T")[0]}</Col>
            </Row>
            <Row>
              <Col span={12}>{t("reservations.card.toDate")}</Col>
              <Col span={12}>{reservation.bookedTo.split("T")[0]}</Col>
            </Row>
            <Row>
              <Col span={12}>{t("reservations.card.breakfast")}</Col>
              <Col flex={"auto"}>{t(reservation.breakfast.toString())}</Col>
            </Row>
            <Row>
              <Col span={12}>{t("reservations.card.dailyClean")}</Col>
              <Col flex={"auto"}>{t(reservation.dailyCleaning.toString())}</Col>
            </Row>
            <Row justify={"center"}>
              <Popconfirm
                title={t("reservations.card.revokeConfirmation.title")}
                description={t(
                  "reservations.card.revokeConfirmation.description"
                )}
                okText={t("yes")}
                cancelText={t("no")}
                placement="bottom"
                onConfirm={async () => {
                  revokeReservation(reservation.id).then((_) => {
                    message.success(t("messages.revoked"));
                    props.onRevoke();
                  });
                }}
              >
                <Button block danger>
                  {t("reservations.card.revoke")}
                </Button>
              </Popconfirm>
            </Row>
          </>
        }
      />
    </Card>
  );

  function imageExists(image_url) {
    if (!image_url.includes("http")) {
      return false;
    }
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();
    return http.status == 200;
  }
}
