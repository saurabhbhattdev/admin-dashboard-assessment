import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./layouts/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import AddUser from "./pages/AddUser.jsx";
import Wizard from "./pages/Wizard.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        theme="dark"
        richColors
        expand={false}
      />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* User Management */}
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />

          {/* Multi-Step Wizard */}
          <Route path="wizard" element={<Wizard />} />

          {/* Projects */}
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}