
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// In-memory store for rate limiting (for demonstration purposes)
const requestCounts: Record<string, { count: number; timestamp: number }> = {};

class AIService {
  private model = genAI.getGenerativeModel({ model: 'gemini-3-pro-preview' });

  private async checkRateLimit(userId: string, tier: 'free' | 'pro'): Promise<boolean> {
    const now = Date.now();
    const limit = tier === 'pro' ? 100 : 10;
    const window = 60 * 1000; // 1 minute

    const userRequests = requestCounts[userId];

    if (userRequests && now - userRequests.timestamp < window) {
      if (userRequests.count >= limit) {
        return false; // Rate limit exceeded
      }
      requestCounts[userId].count++;
    } else {
      requestCounts[userId] = { count: 1, timestamp: now };
    }

    return true; // Request allowed
  }

  private async logRequest(data: {
    tenantId: string;
    userId: string;
    prompt: string;
    model: string;
    tokensUsed: number;
    costUSD: number;
    responseTime: number;
    status: string;
  }) {
    // In a real application, you would save this to your database
    // await prisma.aIRequest.create({ data });
    console.log('Logging AI Request:', data);
  }

  async fetchInventoryData() {
    // Mock data for demonstration
    return {
      stockLevels: [
        { sku: 'SKU001', stock: 100, reorderPoint: 30 },
        { sku: 'SKU002', stock: 50, reorderPoint: 20 },
      ],
    };
  }

  async analyzeSalesTrends(dateRange: 30 | 60 | 90) {
    // Mock data for demonstration
    return {
      salesData: [
        { date: '2024-04-01', sales: 1000 },
        { date: '2024-04-15', sales: 1500 },
      ],
      velocity: 50,
      growthRate: 1.5,
    };
  }

  async generateRecommendations(userId: string, tenantId: string, inventoryData: any, salesData: any) {
    const isAllowed = await this.checkRateLimit(userId, 'free'); // Assume 'free' tier for now
    if (!isAllowed) {
      await this.logRequest({
        tenantId,
        userId,
        prompt: 'Rate limited',
        model: this.model.model,
        tokensUsed: 0,
        costUSD: 0,
        responseTime: 0,
        status: 'rate_limited',
      });
      return { error: 'Rate limit exceeded. Please try again later.' };
    }

    const startTime = Date.now();

    // Simple input sanitization
    const sanitizedInventory = JSON.stringify(inventoryData).replace(/[<>]/g, '');
    const sanitizedSales = JSON.stringify(salesData).replace(/[<>]/g, '');

    const prompt = `
      You are an ERP AI Assistant for retail/wholesale businesses in Bangladesh. Always:
      - Use BDT (Bangladeshi Taka) for currency
      - Format dates as DD/MM/YYYY
      - Consider local holidays (Bengali New Year, Eid, etc.)
      - Account for seasonal demand variations
      - Provide recommendations in Bengali if needed
      - Consider GST and local tax regulations

      Based on the following data:
      Inventory: ${sanitizedInventory}
      Sales: ${sanitizedSales}

      Provide the following recommendations in JSON format:
      - Low stock alerts
      - Reorder quantities
      - Demand forecasts
      - Cost optimization suggestions
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      const responseTime = Date.now() - startTime;

      // Basic validation of the response
      if (!text.startsWith('{') || !text.endsWith('}')) {
        throw new Error('Invalid JSON response from API');
      }

      const recommendations = JSON.parse(text);

      await this.logRequest({
        tenantId,
        userId,
        prompt,
        model: this.model.model,
        tokensUsed: prompt.length, // This is a simplification. Use a proper tokenizer.
        costUSD: 0.01, // Simplified cost
        responseTime,
        status: 'success',
      });

      return recommendations;
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      await this.logRequest({
        tenantId,
        userId,
        prompt,
        model: this.model.model,
        tokensUsed: prompt.length, // Simplified
        costUSD: 0.01, // Simplified cost
        responseTime,
        status: 'error',
      });

      console.error('Error generating recommendations:', error);
      return { error: 'Failed to generate recommendations.', details: error.message };
    }
  }
}

export const aiService = new AIService();
