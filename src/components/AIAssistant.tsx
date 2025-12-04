
'use client';

import { useEffect, useState } from 'react';
import { aiService } from '../../apps/api/src/modules/ai/ai.service';

export default function AIAssistant() {
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    async function getRecommendations() {
      const inventoryData = await aiService.fetchInventoryData();
      const salesData = await aiService.analyzeSalesTrends(30);
      const result = await aiService.generateRecommendations(inventoryData, salesData);
      setRecommendations(result);
    }

    getRecommendations();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
      {recommendations ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Inventory Recommendations</h3>
          {recommendations.lowStockAlerts && (
            <div className="mb-4">
              <h4 className="font-bold">Low Stock Alerts:</h4>
              <ul>
                {recommendations.lowStockAlerts.map((alert: any, index: number) => (
                  <li key={index}>{alert.sku}: {alert.message}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Add more sections for other recommendations */}
        </div>
      ) : (
        <p>Loading AI recommendations...</p>
      )}
    </div>
  );
}
