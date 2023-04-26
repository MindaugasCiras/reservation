import React from "react";
import { Button, Checkbox, Form, Input, Card, Space, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/AuthService";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const res = await registerUser(values);
    if (res.status == 200) {
      message.success(t("messages.registered"))
      navigate("/log-in");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <Card title={t("auth.register")}>
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={t("auth.username")}
            name="username"
            rules={[
              { required: true, message: t("auth.validation.username.required") },
              { min: 4, message: t("auth.validation.username.tooShort") },
            ]}
          >
            <Input placeholder={t("auth.username")} />
          </Form.Item>

          <Form.Item
            label={t("auth.password")}
            name="password"
            rules={[
              { required: true, message: t("auth.validation.password.required") },
              { min: 6, message: t("auth.validation.password.tooShort") },
            ]}
          >
            <Input.Password placeholder={t("auth.password")} />
          </Form.Item>
          <Form.Item
            label={t("auth.repeatPassword")}
            name="repeat_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("auth.validation.repeatPassword.required"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      t("auth.validation.repeatPassword.noMatch")
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={t("auth.repeatPassword")} />
          </Form.Item>
          <Row justify="center" gutter={16}>
            <Col>
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                {t("auth.registerButton")}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item noStyle>
                <Button
                  type="default"
                  onClick={() => {
                    navigate("/log-in");
                  }}
                >{t("auth.loginButton")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
