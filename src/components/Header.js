
import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900 mr-4">Dashboard</h1>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Bell className="text-gray-600 mr-4" size={24} />
          <UserCircle className="text-gray-600" size={24} />
        </div>
      </div>
    </header>
  );
}
