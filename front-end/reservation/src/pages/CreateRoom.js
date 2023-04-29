import {
  Button, Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row
} from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../service/RoomService";

export default function CreateRoom() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { t } = useTranslation();
  const nav = useNavigate();
  const imageUrl = Form.useWatch("imageUrl", { form });
  const onFinish = async (values) => {
    createRoom(values)
      .catch((err) => {
        console.log(err);
        message.error(t("messages.error"));
        return err;
      })
      .then((res) => {
        message.success(t("messages.created"));
        nav("..");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Divider orientation="left">{t("createRoom.divider")}</Divider>

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
              label={t("editRoom.roomName")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("editRoom.validation.nameRequired"),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("editRoom.imageUrl")}
              name="imageUrl"
              rules={[
                {
                  required: true,
                  message: t("editRoom.validation.imageRequired"),
                },
                {
                  type: "url",
                  warningOnly: true,
                  message: t("editRoom.validation.url"),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("editRoom.size")}
              name="sizeSqm"
              rules={[
                {
                  required: true,
                  message: t("editRoom.validation.sizeRequired"),
                },
              ]}
            >
              <InputNumber min={5} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label={t("editRoom.capacity")}
              name="capacity"
              rules={[
                {
                  required: true,
                  message: t("editRoom.validation.capacityRequired"),
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label={t("editRoom.bedCount")}
              name="bedCount"
              rules={[
                {
                  required: true,
                  message: t("editRoom.validation.bedCountRequired"),
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label={t("editRoom.price")}
              name="price"
              rules={[
                {
                  required: true,
                  message: t("editRoom.validation.priceRequired"),
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    {t("editRoom.buttonCreate")}
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
