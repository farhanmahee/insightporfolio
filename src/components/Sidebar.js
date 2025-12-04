
import Link from 'next/link';
import { Home, ShoppingCart, Users } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">ERP Solution</h1>
      </div>
      <nav className="mt-6">
        <Link href="/" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-700">
          <Home className="mr-3" size={20} />
          Dashboard
        </Link>
        <Link href="/sales" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-700">
          <ShoppingCart className="mr-3" size={20} />
          Sales
        </Link>
        <Link href="/customers" className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-700">
          <Users className="mr-3" size={20} />
          Customers
        </Link>
      </nav>
    </div>
  );
}
