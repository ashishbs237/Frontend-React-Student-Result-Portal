import { Home, Lock, ExitToApp, School, Dashboard, Assessment, Settings, Menu as MenuIcon } from "@mui/icons-material";

export const menuItems = [
    
    // Student-Specific Menus
    { text: "View Results", icon: <Assessment />, path: "/student/results", role: "student" },
    { text: "Profile", icon: <School />, path: "/student/profile", role: "student" },
    { text: "Change Password", icon: <Lock />, path: "/student/change-password", role: "all" },

    // Admin-Specific Menus
    { text: "Dashboard", icon: <Dashboard />, path: "/admin/admin", role: "admin" },
    { text: "Manage Students", icon: <School />, path: "/admin/manage-students", role: "admin" },
    { text: "Manage Results", icon: <Assessment />, path: "/admin/manage-results", role: "admin" },
  ];