import { Outlet, createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Connectors from "./pages/Connectors";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Outlet /> : <Navigate to="/login" replace />;
};

const ALreadyLoggedIn = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Navigate to="/" replace /> : <Outlet />;
};

const ComponentWithHeaderAndFooter = ({ page }) => {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

const ComponentWithFooter = ({ page }) => {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

const routes = createBrowserRouter([
  {
    element: <ALreadyLoggedIn />,
    children: [
      {
        path: "/signup",
        element: <ComponentWithFooter page={<SignUp />} />,
      },
      {
        path: "/login",
        element: <ComponentWithFooter page={<Login />} />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <ComponentWithHeaderAndFooter page={<App />} />,
      },
      {
        path: "/connectors",
        element: <ComponentWithHeaderAndFooter page={<Connectors />} />,
      },
      {
        path: "/privacy",
        element: <ComponentWithHeaderAndFooter page={<Privacy />} />,
      },
      {
        path: "/terms",
        element: <ComponentWithHeaderAndFooter page={<Terms />} />,
      },
    ],
  },
  {
    path: "*",
    element: <ComponentWithFooter page={<NotFound />} />,
  },
]);

export default routes;
