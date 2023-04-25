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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRoom, getRoom, updateRoom } from "../service/RoomService";

export default function EditRoom() {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch("imageUrl", { form });
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  useEffect(() => {
    fetchRoom();

    return () => {};
  }, []);
  useEffect(() => {
    form.setFieldsValue(room);

    return () => {};
  }, [room]);

  const onFinish = async (values) => {
    await updateRoom(room.id, values);
    api.open({
      message: "Room updated",
      duration: 2,
      onClose: () => {
        fetchRoom();
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Divider orientation="left">Edit room</Divider>
      {contextHolder}
      <Row gutter={16}>
        <Col span={12}>
          <Form
            form={form}
            name="room_edit"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Room name"
              name="name"
              rules={[{ required: true, message: "Please input room name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image url"
              name="imageUrl"
              rules={[{ required: true, message: "Please input image url!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Size sqm"
              name="sizeSqm"
              rules={[
                {
                  required: true,
                  message: "Please input size in square meters!",
                },
              ]}
            >
              <InputNumber min={5} />
            </Form.Item>
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[
                { required: true, message: "Please input room capacity!" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              label="Bed count"
              name="bedCount"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Row justify="space-between">
              <Col flex="auto">
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
              <Col flex="auto" />
              <Col flex="auto">
                <Form.Item>
                  <Button
                    block
                    danger
                    onClick={async () => {
                      await deleteRoom(room.id);
                      api.open({
                        message: "Room deleted",
                        duration: 2,
                        onClose: () => {
                          nav("..");
                        },
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12}>
          <img style={{ maxWidth: "100%" }} src={imageUrl} alt="image" />
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
