import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  error?: string;
}

class OpenAIService {
  private systemPrompt = `You are an AI assistant for an aircraft parts inventory management system. Help users analyze inventory data, identify critical parts, and provide insights about stock levels and conditions.`;

  async chatWithInventory(
    userMessage: string,
    inventoryData: any[],
    systemPromptOverride?: string
  ): Promise<ChatResponse> {
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: systemPromptOverride || this.systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const assistantMessage = response.data.choices[0]?.message?.content;
      
      if (!assistantMessage) {
        throw new Error('No response from OpenAI');
      }

      return {
        message: assistantMessage,
      };
    } catch (error: any) {
      console.error('Error chatting with OpenAI:', error);
      return {
        message: 'Sorry, I encountered an error while processing your request. Please try again.',
        error: error.message,
      };
    }
  }

  private createInventoryContext(inventoryData: any[]): string {
    if (!inventoryData.length) {
      return 'No inventory data available.';
    }

    const summary = {
      totalItems: inventoryData.length,
      uniqueParts: new Set(inventoryData.map(item => item.PN)).size,
      materialGroups: [...new Set(inventoryData.map(item => item.MAT_GROUP))],
      conditions: [...new Set(inventoryData.map(item => item.CONDITION_CODE))],
      warehouses: [...new Set(inventoryData.map(item => item.WAREHOUSE_CODE))],
      totalValue: inventoryData.reduce((sum, item) => sum + (item.EXT_COST || 0), 0),
      lowStockItems: inventoryData.filter(item => item.QTY_OH <= 1).length,
      reservedItems: inventoryData.filter(item => item.QTY_RESERVED > 0).length,
    };

    let context = `Inventory Summary:
- Total Items: ${summary.totalItems}
- Unique Part Numbers: ${summary.uniqueParts}
- Material Groups: ${summary.materialGroups.join(', ')}
- Condition Codes: ${summary.conditions.join(', ')}
- Warehouses: ${summary.warehouses.join(', ')}
- Total Inventory Value: $${summary.totalValue.toFixed(2)}
- Low Stock Items: ${summary.lowStockItems}
- Items with Reservations: ${summary.reservedItems}

Sample Items:`;

    // Add first 5 items as examples
    inventoryData.slice(0, 5).forEach(item => {
      context += `\n- ${item.PN}: ${item.DESCRIPTION}
  * Qty: ${item.QTY_OH} (Available: ${item.QTY_AVAILABLE}, Reserved: ${item.QTY_RESERVED})
  * Location: ${item.LOCATION_CODE} (${item.WAREHOUSE_CODE})
  * Condition: ${item.CONDITION_CODE}
  * Material Group: ${item.MAT_GROUP}
  * Cost: $${item.UNIT_COST.toFixed(2)}`;
    });

    return context;
  }

  async generateInventoryInsights(inventoryData: any[]): Promise<string> {
    const prompt = `Based on the aircraft parts inventory data, provide 3-5 key insights about:
1. Critical parts availability and stock levels
2. Distribution across material groups and conditions
3. High-value items and cost analysis
4. Warehouse utilization and location optimization
5. Parts requiring attention (age, condition, quantity)

Please format the response in a clear, bullet-pointed format with specific recommendations.`;

    const response = await this.chatWithInventory(prompt, inventoryData);
    return response.message;
  }

  async analyzeLowStock(inventoryData: any[]): Promise<string> {
    const lowStockItems = inventoryData.filter(item => item.QTY_OH <= 1);
    
    const prompt = `Analyze the low stock aircraft parts and provide:
1. Critical parts that need immediate attention
2. Priority recommendations based on:
   - Part criticality (LLP vs Expendable)
   - Current quantity vs typical usage
   - Lead time considerations
3. Suggested actions for each critical item
4. Alternative parts or locations if available

Low stock items: ${lowStockItems.map(item => 
  `${item.PN} (${item.DESCRIPTION}) - Qty: ${item.QTY_OH}, Category: ${item.STOCK_CATEGORY_CODE}`
).join('\n')}`;

    const response = await this.chatWithInventory(prompt, inventoryData);
    return response.message;
  }
}

export default new OpenAIService(); 