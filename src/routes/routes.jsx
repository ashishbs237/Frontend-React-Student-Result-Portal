import { lazy, Suspense } from "react";
import { Spinner } from "reactstrap";
import ProtectedRoute from "./ProtectedRoutes";
import { Navigate } from "react-router";
import Profile from "../pages/student/Profile"

const Load = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner color="primary" className="m-2" />}>
      <Component {...props} />
    </Suspense>
  );

const Home = Load(
  lazy(() =>
    import("../pages/Login").then((module) => ({ default: module.default }))
  )
);

const Layout = Load(
  lazy(() =>
    import("../layouts/Layout").then((module) => ({ default: module.default }))
  )
);

const Dashboard = Load(
  lazy(() =>
    import("../pages/Dashboard").then((module) => ({ default: module.default }))
  )
);

const ManageStudents = Load(
  lazy(() =>
    import("../pages/admin/ManageStudents").then((module) => ({ default: module.default }))
  )
);

const Result = Load(
  lazy(() =>
    import("../pages/student/Results").then((module) => ({ default: module.default }))
  )
);


const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}  children={<Layout />} />
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> }, // Default dashboard
      { path: "manage-students", element: <ProtectedRoute allowedRoles={["admin"]} children={<ManageStudents />} /> },
      { path: "manage-result", element: <ProtectedRoute allowedRoles={["admin"]} children={<Profile />} /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}  children={<Layout />} />
    ),
    children: [
      { path: "results", element: <ProtectedRoute allowedRoles={["student"]} children={<Result />} /> },
      { path: "profile", element: <ProtectedRoute allowedRoles={["student"]} children={<Profile />} /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default routes;
