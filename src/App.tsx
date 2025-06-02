import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 flex-1 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ajuda" element={<Help />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}
