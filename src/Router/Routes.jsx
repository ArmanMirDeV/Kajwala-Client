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
        element: <MyServices />,
      },
      {
        path: "add-services",
        element: <AddServices />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "profile",
        element: <Profile />,
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
