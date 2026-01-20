import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import DashboardLayout from "./layout/DashboardLayout";
import CommonLayout from "./layout/CommonLayout";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: ":id",
        element: <Edit />,
      },
    ],
  },
];

export default routes;
