import {
  Button, Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message, Popconfirm,
  Row
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRoom, getRoom, updateRoom } from "../service/RoomService";

export default function EditRoom() {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const [form] = Form.useForm();
  const imageUrl = Form.useWatch("imageUrl", { form });
  const nav = useNavigate();

  const { t } = useTranslation();
  useEffect(() => {
    fetchRoom();

    return () => {};
  }, []);
  useEffect(() => {
    form.setFieldsValue(room);

    return () => {};
  }, [room]);

  const onFinish = async (values) => {
    const res = await updateRoom(room.id, values).catch((err) => {
      console.log(err);
      message.error(t("messages.error"));
      return err;
    });
    if (res.status == 200) {
      message.success(t("messages.updated"));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(t("messages.error"));
  };
  return (
    <>
      <Divider orientation="left">{t("editRoom.divider")}</Divider>
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
              <InputNumber min={5} />
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
              <InputNumber min={1} />
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
              <InputNumber min={1} />
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
              <InputNumber min={0} />
            </Form.Item>
            <Row justify="space-between">
              <Col flex="auto">
                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    {t("editRoom.buttonUpdate")}
                  </Button>
                </Form.Item>
              </Col>
              <Col flex="auto" />
              <Col flex="auto">
                <Form.Item>
                  <Popconfirm
                    title={t("editRoom.deleteConfirmation.title")}
                    description={t("editRoom.deleteConfirmation.description")}
                    okText={t("yes")}
                    cancelText={t("no")}
                    onConfirm={async () => {
                      await deleteRoom(room.id);
                      message.success(t("messages.deleted"));
                      nav("..");
                    }}
                  >
                    <Button block danger>
                      {t("editRoom.buttonDelete")}
                    </Button>
                  </Popconfirm>
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
    });
  }
}
