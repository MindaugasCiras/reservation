import React, { useContext } from "react";
import { Button, Checkbox, Form, Input, Card, Space, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/AuthService";
import { AuthenticationContext } from "../context";
import { isAdmin } from "../utils/auhtUtils";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const res = await loginUser(values).catch((err) => {
      console.log(err);
      message.error(t("messages.error"));
      return err;
    });
    if (res.status == 200) {
      const auth = { loggedIn: true, ...res.data };
      setAuthData({ ...auth, isAdmin: isAdmin(auth) });
      navigate("/");
    } else{
      message.error(t("messages.error"))
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
      <Card title={t('auth.login')}>
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
            label={t('auth.username')}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('auth.password')}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item noStyle>
            <Space align="center" split></Space>
          </Form.Item>
          <Row justify="center" gutter={16}>
            <Col>
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                 {t('auth.loginButton')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item noStyle>
                <Button
                  type="default"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                 {t('auth.registerButton')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
