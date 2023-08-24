import { Skeleton } from "antd";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Authenticated from "./Authenticated";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

const Conversations = React.lazy(() => import("./pages/Conversations"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: (
        <Authenticated>
          <Conversations />
        </Authenticated>
      ),
    },
  ]);

  return (
    <React.Suspense fallback={<Skeleton />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
