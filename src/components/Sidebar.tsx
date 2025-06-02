import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Bell,
  MessageCircle,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const topMenu = [
  { icon: <LayoutDashboard size={20} />, path: "/" },
  { icon: <FileText size={20} />, path: "/docs" },
  { icon: <MessageCircle size={20} />, path: "/chat" },
  { icon: <Bell size={20} />, path: "/notifications" },
  { icon: <Settings size={20} />, path: "/settings" },
];

const bottomMenu = [
  { icon: <HelpCircle size={20} />, path: "/ajuda" },
  { icon: <LogOut size={20} />, path: "/logout" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 w-16 h-screen bg-white flex flex-col items-center py-4 z-10">
      <div className="w-10 h-10 bg-black rounded-full mb-4" />

      <nav className="flex flex-col gap-6">
        {topMenu.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              location.pathname === item.path
                ? "bg-gray-100 text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>

      <div className="flex-grow" />

      <div className="flex flex-col gap-6 mb-2">
        {bottomMenu.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black rounded-xl transition-colors"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
}
