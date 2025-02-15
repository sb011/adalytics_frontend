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
import CreateOrganization from "./pages/CreateOrganization";
import Users from "./pages/Users";
import VerifyUser from "./pages/VerifyUser";
import WaitForEmailVerify from "./pages/WaitForEmailVerify";
import Dashboards from "./pages/Dashboards";

import "./index.css";
import ViewMetric from "./pages/ViewMetric";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Outlet /> : <Navigate to="/login" replace />;
};

const AlreadyLoggedIn = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Navigate to="/" replace /> : <Outlet />;
};

const ComponentWithHeaderAndFooter = ({ page }) => {
  return (
    <>
      <Header />
      <div className="page">
        <div className="content">{page}</div>
        <div className="footer">
          <Footer />
        </div>
      </div>
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
    element: <AlreadyLoggedIn />,
    children: [
      {
        path: "/organization/create",
        element: <ComponentWithFooter page={<CreateOrganization />} />,
      },
      {
        path: "/login",
        element: <ComponentWithFooter page={<Login />} />,
      },
      {
        path: "/verify",
        element: <ComponentWithFooter page={<VerifyUser />} />,
      },
      {
        path: "/verify-email",
        element: <ComponentWithFooter page={<WaitForEmailVerify />} />,
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
        path: "/signup",
        element: <ComponentWithFooter page={<SignUp />} />,
      },
      {
        path: "/connectors",
        element: <ComponentWithHeaderAndFooter page={<Connectors />} />,
      },
      {
        path: "/users",
        element: <ComponentWithHeaderAndFooter page={<Users />} />,
      },
      {
        path: "/dashboards",
        element: <ComponentWithHeaderAndFooter page={<Dashboards />} />,
      },
      {
        path: "/dashboards/metric/:id",
        element: <ComponentWithHeaderAndFooter page={<ViewMetric />} />,
      },
    ],
  },
  {
    path: "/privacy",
    element: <ComponentWithFooter page={<Privacy />} />,
  },
  {
    path: "/terms",
    element: <ComponentWithFooter page={<Terms />} />,
  },
  {
    path: "*",
    element: <ComponentWithFooter page={<NotFound />} />,
  },
]);

export default routes;
