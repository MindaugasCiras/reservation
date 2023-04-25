import React, { useContext } from "react";
import { Button, Checkbox, Form, Input, Card, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/AuthService";
import { AuthenticationContext } from "../context";
import { isAdmin } from "../utils/auhtUtils";

export default function LoginPage() {
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await loginUser(values);
    console.log(res);
    if (res.status == 200) {
      const auth = { loggedIn: true, ...res.data };
      setAuthData({ ...auth, isAdmin: isAdmin(auth) });
      navigate("/");
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
      <Card title="Login">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
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
                  Login
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
                  Register
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
