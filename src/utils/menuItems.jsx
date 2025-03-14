import {
  Home,
  Lock,
  ExitToApp,
  School,
  Dashboard,
  Assessment,
  Settings,
  Menu as MenuIcon,
} from "@mui/icons-material";

export const sidebarMenu = [
  // Admin-Specific Menus
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/admin/dashboard",
    role: "admin",
  },
  {
    text: "Manage Students",
    icon: <School />,
    path: "/admin/manage-students",
    role: "admin",
  },
  {
    text: "Manage Results",
    icon: <Assessment />,
    path: "/admin/manage-results",
    role: "admin",
  },

  // Student-Specific Menus
  {
    text: "View Result",
    icon: <Assessment />,
    path: "/student/view-result",
    role: "student",
  },
  {
    text: "Profile",
    icon: <School />,
    path: "/student/profile",
    role: "student",
  },
  {
    text: "Change Password",
    icon: <Lock />,
    path: "/student/change-password",
    role: "student",
  },
];

export const manageStudentMenu = (deleteSelected, deleteAll) => [
  { label: "Delete Selected", onClick: deleteSelected , disabled: false },
  { label: "Delete All", onClick: deleteAll , disabled : true },
];
