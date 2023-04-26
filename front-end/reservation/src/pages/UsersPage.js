import { Button, Card, Col, Divider, message, Popconfirm, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../service/UserService";
import { useTranslation } from "react-i18next";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    updateUsers();
    return () => {};
  }, []);

  const { t } = useTranslation();
  function updateUsers() {
    getUsers().then((data) => {
      setUsers(data.data);
    });
  }
  return (
    <>
      <Divider orientation="left">{t("users.divider")}</Divider>
      <Row gutter={[16, 16]}>
        {users.map((user, index) => {
          return (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                title={
                  <Row justify="space-between" align="middle">
                    <Col>{user.username}</Col>
                    <Col>
                      <Popconfirm
                        title={t("users.deletionConfirmation.title")}
                        description={t(
                          "users.deletionConfirmation.description"
                        )}
                        okText={t("yes")}
                        cancelText={t("no")}
                        placement="bottom"
                        onConfirm={async () => {
                          await deleteUser(user.id);
                          message.success("Deleted");
                          updateUsers();
                        }}
                      >
                        <Button
                          icon=<DeleteOutlined style={{ color: "red" }} />
                        />
                      </Popconfirm>
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
