import { Button, Card, Col, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import {
  UserOutlined,
  FullscreenOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import { revokeReservation } from "../service/ReservationService";

export default function ReservationCard(props) {
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
        title={room.name}
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
              <Col span={6}>User</Col>
              <Col span={12}>{reservation.user.username}</Col>
            </Row>
            <Row>
              <Col span={6}>From</Col>
              <Col span={12}>{reservation.bookedFrom.split("T")[0]}</Col>
            </Row>
            <Row>
              <Col span={6}>To</Col>
              <Col span={12}>{reservation.bookedTo.split("T")[0]}</Col>
            </Row>
            <Row>
              <Col span={12}>Breakfast</Col>
              <Col span={12}>{reservation.breakfast.toString()}</Col>
            </Row>
            <Row>
              <Col span={12}>Daily clean</Col>
              <Col span={12}>{reservation.dailyCleaning.toString()}</Col>
            </Row>
            <Row justify={"center"}>
              <Button
                danger
                onClick={() => {
                  revokeReservation(reservation.id).then((_) => {
                    props.onRevoke();
                  });
                }}
              >
                Revoke
              </Button>
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
