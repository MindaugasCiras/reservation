import { Layout, Menu, notification, Space } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthenticationContext } from "../context";
import { Content, Header } from "antd/es/layout/layout";
import { isAdmin } from "../utils/auhtUtils";
export default function HomePage() {
  const [api, contextHolder] = notification.useNotification();
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const nav = useNavigate();
  useEffect(() => {
    if (authData.loggedIn !== true) {
      nav("/log-in");
    }
    return () => {};
  }, [authData]);

  const location = useLocation();
  const [current, setCurrent] = useState();
  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      setAuthData({});
      return;
    }
    nav(e.key);
  };
  let items = [];
  if (authData.isAdmin) {
    items = [
      {
        label: "Reservations",
        key: "reservations",
      },
      {
        label: "Rooms",
        key: "rooms",
      },
      {
        label: "Users",
        key: "users",
      },
      {
        label: "Logout",
        key: "logout",
        danger: true,
      },
    ];
  } else {
    items = [
      {
        label: "Search",
        key: "search",
      },
      {
        label: "Reservations",
        key: "reservations",
      },
      {
        label: "Logout",
        key: "logout",
        danger: true,
      },
    ];
  }
  const currentTab =
    location.pathname != "/" ? location.pathname.split("/")[1] : items[0].key;
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 10]}>
      <Menu
        onClick={onClick}
        selectedKeys={[currentTab]}
        mode="horizontal"
        items={items}
      />
      {contextHolder}
      <div style={{ paddingInline: "20px" }}>
        <Outlet />
      </div>
    </Space>
  );
  return;
}
