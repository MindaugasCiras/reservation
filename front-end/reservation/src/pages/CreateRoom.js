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
import { getRoom, createRoom } from "../service/RoomService";

export default function CreateRoom() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const nav = useNavigate();
  const imageUrl = Form.useWatch("imageUrl", { form });
  const onFinish = async (values) => {
    await createRoom(values);
    api.open({
      message: "Room created",
      duration: 2,
      onClose: () => {
        nav("..");
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Divider orientation="left">Create room</Divider>

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
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Create
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
}
