import { Menu, notification, Select, Space } from "antd";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../context";
import { useTranslation } from "react-i18next";
import { logOutUser } from "../service/AuthService";
export default function HomePage() {
  const [api, contextHolder] = notification.useNotification();
  const { authData, setAuthData } = useContext(AuthenticationContext);
  const nav = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (authData.loggedIn !== true) {
      localStorage.removeItem("authData");
      nav("/log-in");
    } else {
      localStorage.setItem("authData", JSON.stringify(authData));
    }
    return () => {};
  }, [authData]);

  const location = useLocation();
  const onClick = async (e) => {
    if (e.key === "logout") {
      await logOutUser();
      setAuthData({});
      return;
    }
    if (e.key != "") {
      nav(e.key);
    }
  };
  let items = [];
  if (authData.isAdmin) {
    items = [
      {
        label: t("navBar.reservations"),
        key: "reservations",
      },
      {
        label: t("navBar.rooms"),
        key: "rooms",
      },
      {
        label: t("navBar.users"),
        key: "users",
      },
    ];
  } else {
    items = [
      {
        label: t("navBar.search"),
        key: "search",
      },
      {
        label: t("navBar.reservations"),
        key: "reservations",
      },
    ];
  }
  items = [
    ...items,
    {
      label: t("navBar.logout"),
      key: "logout",
      danger: true,
    },
    {
      label: (
        <Select
          defaultValue={i18n.resolvedLanguage}
          onChange={(value) => {
            i18n.changeLanguage(value);
            dayjs.locale(value);
          }}
          style={{ width: 120 }}
          options={[
            { value: "en", label: "English" },
            { value: "lt", label: "Lietuviu" },
          ]}
        />
      ),
      key: "",
    },
  ];
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
