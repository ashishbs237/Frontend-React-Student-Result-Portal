import { lazy, Suspense } from "react";
import { Spinner } from "reactstrap";
import ProtectedRoute from "./ProtectedRoutes";
import { Navigate } from "react-router";

const Load = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner color="primary" className="m-2" />}>
      <Component {...props} />
    </Suspense>
  );

// Common Component
const Login = Load(
  lazy(() =>
    import("../pages/Login").then((module) => ({ default: module.default }))
  )
);

const Layout = Load(
  lazy(() =>
    import("../layouts/Layout").then((module) => ({ default: module.default }))
  )
);

// Admin Components
const AdminDashboard = Load(
  lazy(() =>
    import("../pages/admin/AdminDashboard").then((module) => ({
      default: module.default,
    }))
  )
);

const ManageStudents = Load(
  lazy(() =>
    import("../pages/admin/ManageStudents").then((module) => ({
      default: module.default,
    }))
  )
);

const ManageResults = Load(
  lazy(() =>
    import("../pages/admin/ManageResults").then((module) => ({
      default: module.default,
    }))
  )
);

// Student Components
const ViewResult = Load(
  lazy(() =>
    import("../pages/student/ViewResult").then((module) => ({
      default: module.default,
    }))
  )
);

const Profile = Load(
  lazy(() =>
    import("../pages/student/Profile").then((module) => ({
      default: module.default,
    }))
  )
);

const ChangePassword = Load(
  lazy(() =>
    import("../pages/student/ChangePassword").then((module) => ({
      default: module.default,
    }))
  )
);

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  // Admin Routes Handling
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} children={<Layout />} />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> }, // Default dashboard
      {
        path: "manage-students",
        element: (
          <ProtectedRoute
            allowedRoles={["admin"]}
            children={<ManageStudents />}
          />
        ),
      },
      {
        path: "manage-results",
        element: (
          <ProtectedRoute
            allowedRoles={["admin"]}
            children={<ManageResults />}
          />
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  // Student Routes Handling
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]} children={<Layout />} />
    ),
    children: [
      {
        path: "view-result",
        element: (
          <ProtectedRoute
            allowedRoles={["student"]}
            children={<ViewResult />}
          />
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["student"]} children={<Profile />} />
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute
            allowedRoles={["student"]}
            children={<ChangePassword />}
          />
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default routes;
