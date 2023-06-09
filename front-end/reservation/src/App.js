import "./App.css";
import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import { AuthenticationContext } from "./context";
import { useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import SearchRooms from "./pages/SearchRooms";
import RoomReservations from "./pages/RoomReservations";
import UsersPage from "./pages/UsersPage";
import RoomView from "./pages/RoomView";
import EditRoom from "./pages/EditRoom";
import CreateRoom from "./pages/CreateRoom";
import BookRoom from "./pages/BookRoom";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import "dayjs/locale/lt";
import ltLT from "antd/locale/lt_LT";
import enUS from "antd/locale/en_US";
function App() {
  const [authData, setAuthData] = useState(() => {
    const dataFromStorage = localStorage.getItem("authData");
    console.log(JSON.parse(dataFromStorage));
    if (dataFromStorage != null) {
      return JSON.parse(dataFromStorage);
    }
    return {};
  });
  const value = useMemo(() => ({ authData, setAuthData }), [authData]);

  const { i18n } = useTranslation();
  return (
    <ConfigProvider locale={i18n.resolvedLanguage === "en" ? enUS : ltLT}>
      <AuthenticationContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route
                index
                element={
                  authData.isAdmin ? <RoomReservations /> : <SearchRooms />
                }
              ></Route>
              <Route path="search">
                <Route index element={<SearchRooms />} />
                <Route path=":roomId/book" element={<BookRoom />} />
              </Route>
              <Route path="reservations">
                <Route index element={<RoomReservations />} />
                <Route path=":reservationId" element={<EditRoom />} />
              </Route>
              <Route path="rooms">
                <Route index element={<RoomView />}></Route>
                <Route path=":roomId" element={<EditRoom />} />
                <Route path="create" element={<CreateRoom />} />
              </Route>
              <Route path="users" element={<UsersPage />}></Route>
            </Route>
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </ConfigProvider>
  );
}

export default App;
