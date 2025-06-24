import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import openAIService from '../services/openAIService';
import ReactMarkdown from 'react-markdown';

interface PageAIChatProps<T> {
  data: T[];
  contextPrompt: string; // e.g., "You are an AI assistant for the Item Master..."
  dataContextBuilder: (data: T[]) => string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function PageAIChat<T>({ data, contextPrompt, dataContextBuilder }: PageAIChatProps<T>) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your AI assistant for this page. How can I help you with the data?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    try {
      // Compose system prompt and context
      const systemPrompt = `${contextPrompt}\n\nCurrent data:\n${dataContextBuilder(data)}`;
      const response = await openAIService.chatWithInventory(userMessage, data as any, systemPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg mt-6 mb-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-green-600 rounded-full">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Page AI Assistant</h3>
          <p className="text-sm text-gray-500">Ask about this page's data</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="max-w-[80%] bg-gray-50 rounded-lg p-3">
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
            {message.role === 'user' && (
              <div className="flex items-start gap-3">
                <div className="max-w-[80%] bg-blue-600 text-white rounded-lg p-3">
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about this data..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 