import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useNavigation,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";

import RegisterPage from "./pages/RegisterPage";
import { AuthenticationContext } from "./context";
import { useContext, useEffect, useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import SearchRooms from "./pages/SearchRooms";
import RoomReservations from "./pages/RoomReservations";
import UsersPage from "./pages/UsersPage";
import RoomView from "./pages/RoomView";
import EditRoom from "./pages/EditRoom";
import CreateRoom from "./pages/CreateRoom";
import BookRoom from "./pages/BookRoom";
import { notification } from "antd";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     loader: () => {
//       return redirect("/log-in");
//     },
//   },
//   {
//     path: "/log-in",
//     element: <LoginPage />,
//   },
//   {
//     path: "/register",
//     element: <RegisterPage />,
//   },
// ]);
function App() {

  const [authData, setAuthData] = useState({});
  const value = useMemo(() => ({ authData, setAuthData }), [authData]);
  useEffect(() => {
    if (authData.loggedIn == true) {
    }
  }, [authData]);

  return (
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
      {/* {useMemo(
        () => (
          <div className="App">
            <RouterProvider router={router} />
          </div>
        ),
        []
      )} */}
    </AuthenticationContext.Provider>
  );
}

export default App;
