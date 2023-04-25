import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { bookRoom } from "../service/ReservationService";
import { deleteRoom, getRoom, updateRoom } from "../service/RoomService";

export default function BookRoom() {
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
    console.log();
    await bookRoom({
      roomId: room.id,
      ...values,
      bookedFrom: url.searchParams.get("from"),
      bookedTo: url.searchParams.get("to"),
    });

    api.open({
      message: "Room reserved",
      duration: 2,
      onClose: () => {
        nav("/reservations")
      },
    });
  };

  return (
    <>
      <Divider orientation="left">Book room</Divider>
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
              <Checkbox>Breakfast included</Checkbox>
            </Form.Item>
            <Form.Item name="dailyCleaning" valuePropName="checked">
              <Checkbox>Daily cleaning</Checkbox>
            </Form.Item>
            <Form.Item label="Comment" name="comment">
              <TextArea rows={4} />
            </Form.Item>
            <Row justify="center">
              <Col flex="auto">
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Book now
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
