import { Outlet, createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Outlet /> : <Navigate to="/login" replace />;
};

const ALreadyLoggedIn = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Navigate to="/" replace /> : <Outlet />;
};

const routes = createBrowserRouter([
  {
    element: <ALreadyLoggedIn />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
