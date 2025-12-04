
import { DollarSign, Users, CreditCard } from 'lucide-react';

export default function DataCard({ title, value, icon }) {
  const Icon = icon;
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="bg-blue-500 rounded-full p-4 text-white">
        <Icon size={24} />
      </div>
    </div>
  );
}
