import { Button, Card, Col, Divider, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../service/UserService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    updateUsers();
    return () => {};
  }, []);

  function updateUsers() {
    getUsers().then((data) => {
      setUsers(data.data);
    });
  }
  return (
    <>
      <Divider orientation="left">Users</Divider>
      <Row gutter={[16, 16]}>
        {users.map((user, index) => {
          return (
            <Col span={4} key={index}>
              <Card
                title={
                  <Row justify="space-between" align="middle">
                    <Col>{user.username}</Col>
                    <Col>
                      <Button
                        icon=<DeleteOutlined style={{ color: "red" }} />
                        onClick={async () => {
                          await deleteUser(user.id);
                          updateUsers();
                        }}
                      />
                    </Col>
                  </Row>
                }
              >
                <Row>Role: {user.authorities.toString()}</Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
