import React from "react";
import { Button, Checkbox, Form, Input, Card, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../service/AuthService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await registerUser(values);
    if(res.status == 200){
        navigate("/log-in")
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
      <Card title="Register">
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 700 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 4, message: "Username too short" },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password too short" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Repeat password"
            name="repeat_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Repeat password" />
          </Form.Item>
          <Row justify="center" gutter={16}>
            <Col>
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit">
                  Register
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
                >
                  Log in
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
