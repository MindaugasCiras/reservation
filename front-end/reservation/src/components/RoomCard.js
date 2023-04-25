import { Card, Space } from "antd";
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
