import { Card, Col, Row, Space } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import {
  UserOutlined,
  FullscreenOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";

export default function RoomCard(props) {
  const { room } = props;
  return (
    <Card
    style={{ height: "100%" }}
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
            <Col>{room.price} $</Col>
          </Row>
        }
        description={
          <>
            <Row justify={"space-evenly"}>
              |<Col>
                <UserOutlined />
                <span>{room.capacity}</span>
              </Col>
              |
              <Col>
                <FullscreenOutlined />
                <span>{room.sizeSqm} m2</span>
              </Col>
              |
              <Col>
                <BarcodeOutlined />
                <span>{room.bedCount}</span>
              </Col>|
            </Row>
          </>
        }
      />
    </Card>
  );

  function imageExists(image_url) {
    if (image_url && !image_url.includes("http")) {
      return false;
    }
    return true;
  }
}
