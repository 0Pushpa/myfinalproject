import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Mainpage = React.lazy(() => import("./components/homepage/Mainpage"));
const Login_Registration = React.lazy(() =>
  import("./components/login_signup/v2/Login_Register")
);
const Frontendmain = React.lazy(() =>
  import("./components/application/Frontendmain")
);
const GroupList = React.lazy(() =>
  import("./components/application/group/GroupList")
);
const NewGroupInterface = React.lazy(() =>
  import("./components/application/group/NewGroupInterface")
);
const Page404 = React.lazy(() => import("./components/application/Page404"));

export const Routes = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return [
    {
      path: "/",
      element: <Mainpage />,
    },
    {
      path: "/signup",
      element: isLoggedIn ? <Navigate to="/slate" /> : <Login_Registration />,
    },
    {
      path: "/slate/*", // Important for nested routes
      element: isLoggedIn ? <Frontendmain /> : <Navigate to="/" />,
      children: [
        {
          path: "groups",
          element: <GroupList />,
        },
        {
          path: "groups/:id",
          element: <NewGroupInterface />,
        },
        {
          path: "chat/:id",
          element: <NewGroupInterface />,
        },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ];
};
