import axios from 'axios';
import { InventoryItem } from './googleSheetsService';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

class OpenAIService {
  private systemPrompt = `You are an AI assistant for an inventory management system. You have access to inventory data and can help users with:

1. Inventory analysis and insights
2. Stock level recommendations
3. Identifying low stock items
4. Category-based analysis
5. Supplier information
6. Location-based queries
7. General inventory management advice

Always provide helpful, accurate responses based on the available data. If you don't have enough information to answer a question, ask for clarification or suggest what additional data might be needed.`;

  async chatWithInventory(
    userMessage: string,
    inventoryData: InventoryItem[]
  ): Promise<ChatResponse> {
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      // Create a context string with inventory data
      const inventoryContext = this.createInventoryContext(inventoryData);
      
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `${this.systemPrompt}\n\nCurrent inventory data:\n${inventoryContext}`
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
          max_tokens: 1000,
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

  private createInventoryContext(inventoryData: InventoryItem[]): string {
    if (!inventoryData.length) {
      return 'No inventory data available.';
    }

    const summary = {
      totalItems: inventoryData.length,
      categories: [...new Set(inventoryData.map(item => item.category))],
      lowStockItems: inventoryData.filter(item => item.quantity <= item.minQuantity).length,
      outOfStockItems: inventoryData.filter(item => item.quantity === 0).length,
      suppliers: [...new Set(inventoryData.map(item => item.supplier))],
      locations: [...new Set(inventoryData.map(item => item.location))],
    };

    let context = `Inventory Summary:
- Total Items: ${summary.totalItems}
- Categories: ${summary.categories.join(', ')}
- Low Stock Items: ${summary.lowStockItems}
- Out of Stock Items: ${summary.outOfStockItems}
- Suppliers: ${summary.suppliers.join(', ')}
- Locations: ${summary.locations.join(', ')}

Sample Items:`;

    // Add first 10 items as examples
    const sampleItems = inventoryData.slice(0, 10);
    sampleItems.forEach(item => {
      context += `\n- ${item.name} (SKU: ${item.sku}): ${item.quantity} ${item.unit} in ${item.location}, Category: ${item.category}`;
    });

    return context;
  }

  async generateInventoryInsights(inventoryData: InventoryItem[]): Promise<string> {
    const prompt = `Based on the inventory data, provide 3-5 key insights about:
1. Stock levels and potential issues
2. Category distribution
3. Supplier analysis
4. Recommendations for inventory management

Please format the response in a clear, bullet-pointed format.`;

    const response = await this.chatWithInventory(prompt, inventoryData);
    return response.message;
  }

  async analyzeLowStock(inventoryData: InventoryItem[]): Promise<string> {
    const lowStockItems = inventoryData.filter(item => item.quantity <= item.minQuantity);
    
    const prompt = `Analyze the low stock items and provide:
1. A summary of items that need reordering
2. Priority recommendations based on stock levels
3. Suggested actions for each critical item

Low stock items: ${lowStockItems.map(item => `${item.name} (${item.quantity}/${item.minQuantity})`).join(', ')}`;

    const response = await this.chatWithInventory(prompt, inventoryData);
    return response.message;
  }
}

export const openAIService = new OpenAIService(); 