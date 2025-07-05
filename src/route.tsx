import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import CommonLayout from "./layout/CommonLayout";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
];

export default routes;
