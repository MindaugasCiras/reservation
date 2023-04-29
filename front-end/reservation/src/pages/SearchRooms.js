import { Col, Row, DatePicker, Space, Button, Divider, message } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { getAvailableRooms } from "../service/RoomService";

const { RangePicker } = DatePicker;
export default function SearchRooms() {
  const [rooms, setRooms] = useState([]);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const fetchRooms = async () => {
    const roomsRes = await getAvailableRooms(
      value[0].format("YYYY-MM-DD"),
      value[1].format("YYYY-MM-DD")
    ).catch((err) => {
      console.log(err);
      message.error(t("messages.error"));
      return err;
    });
    setRooms(roomsRes.data);
  };

  const { t } = useTranslation();
  return (
    <>
      <Divider orientation="left">{t("search.divider")}</Divider>
      <Row justify="center" gutter={16} align="middle">
        <Col>
          <RangePicker
            value={dates || value}
            onCalendarChange={(val) => setDates(val)}
            onChange={(val) => setValue(val)}
            onOpenChange={onOpenChange}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={fetchRooms}>
          {t("search.searchButton")}
          </Button>
        </Col>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row gutter={[16, 16]}>
        {rooms&&rooms.map((room) => (
          <Col xs={24} sm={12} lg={8} key={room.id}>
            <Link
              to={`/search/${room.id}/book?from=${value[0].format(
                "YYYY-MM-DD"
              )}&to=${value[1].format("YYYY-MM-DD")}`}
            >
              <RoomCard room={room} />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
