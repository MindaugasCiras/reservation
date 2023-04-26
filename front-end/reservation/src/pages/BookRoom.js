import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { bookRoom } from "../service/ReservationService";
import { deleteRoom, getRoom, updateRoom } from "../service/RoomService";

export default function BookRoom() {

  const { t } = useTranslation();
  const { roomId } = useParams();
  const [room, setRoom] = useState();
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  useEffect(() => {
    fetchRoom();

    return () => {};
  }, []);

  const onFinish = async (values) => {
    const url = new URL(window.location.href);
    await bookRoom({
      roomId: room.id,
      ...values,
      bookedFrom: url.searchParams.get("from"),
      bookedTo: url.searchParams.get("to"),
    });
    message.success("Room reserved");
    nav("/reservations");
  };

  return (
    <>
      <Divider orientation="left">{t("bookRoom.divider")}</Divider>
      {contextHolder}
      <Row gutter={16}>
        <Col span={12}>{room && <RoomCard room={room} />}</Col>
        <Col span={12}>
          <Form
            name="room_book"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item name="breakfast" valuePropName="checked">
              <Checkbox>{t("bookRoom.breakfast")}</Checkbox>
            </Form.Item>
            <Form.Item name="dailyCleaning" valuePropName="checked">
              <Checkbox>{t("bookRoom.dailyCleaning")}</Checkbox>
            </Form.Item>
            <Form.Item label={t("bookRoom.comment")} name="comment">
              <TextArea rows={4} />
            </Form.Item>
            <Row justify="center">
              <Col flex="auto">
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                  {t("bookRoom.buttonBookNow")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );

  function fetchRoom() {
    getRoom(roomId).then((res) => {
      setRoom(res.data);
      console.log(res.data);
    });
  }
}
