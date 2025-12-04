
import DataCard from '../components/DataCard';
import AIAssistant from '../components/AIAssistant';
import { DollarSign, Users, CreditCard } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DataCard title="Total Sales" value="$12,487" icon={DollarSign} />
        <DataCard title="New Customers" value="134" icon={Users} />
        <DataCard title="Pending Orders" value="23" icon={CreditCard} />
      </div>
      <AIAssistant />
    </div>
  );
}
