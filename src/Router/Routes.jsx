import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Layout/Home";
import Services from "../Pages/Services";
import MyServices from "../Pages/MyServices";
import AddServices from "../Pages/AddServices";
import MyBookings from "../Pages/MyBookings";
import Profile from "../Pages/Profile";
import LogIn from "../Pages/LogIn";
import Registration from "../Pages/Registration";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            {" "}
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "add-services",
        element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "*",
        element: <h2>Error</h2>,
      },
    ],
  },
]);
export default router;
