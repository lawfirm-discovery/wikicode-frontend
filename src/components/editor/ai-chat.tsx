'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Sparkles,
  Code,
  Bug,
  Lightbulb,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  codeBlock?: string;
}

interface AiChatProps {
  onCodeGenerate: (code: string) => void;
  currentCode?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function AiChat({ onCodeGenerate, currentCode }: AiChatProps) {
  const t = useTranslations();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI coding assistant powered by Claude. I can help you generate code, fix bugs, optimize performance, and answer questions about your project. What would you like to work on?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    {
      icon: Code,
      label: 'Generate Component',
      prompt: 'Create a React component with TypeScript',
      type: 'generate',
    },
    {
      icon: Bug,
      label: 'Fix Bug',
      prompt: 'Help me debug this code and fix any issues',
      type: 'chat',
    },
    {
      icon: Lightbulb,
      label: 'Optimize Code',
      prompt: 'Optimize this code for better performance',
      type: 'modify',
    },
    {
      icon: Zap,
      label: 'Refactor',
      prompt: 'Refactor this code to follow best practices',
      type: 'modify',
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wikicode_token');
    }
    return null;
  };

  const callAIChat = async (message: string, context?: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    return response.json();
  };

  const callAIGenerate = async (prompt: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    return response.json();
  };

  const callAIModify = async (code: string, instruction: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/ai/modify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ code, instruction }),
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    return response.json();
  };

  const extractCodeFromResponse = (text: string): { content: string; codeBlock?: string } => {
    // Try to extract code blocks from markdown
    const codeBlockMatch = text.match(/```[\w]*\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      const codeBlock = codeBlockMatch[1].trim();
      const content = text.replace(/```[\w]*\n[\s\S]*?```/g, '[Code generated - see below]').trim();
      return { content, codeBlock };
    }
    return { content: text };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Determine if this is a code generation request
      const isGenerateRequest = currentInput.toLowerCase().includes('create') || 
                                currentInput.toLowerCase().includes('generate') ||
                                currentInput.toLowerCase().includes('make') ||
                                currentInput.toLowerCase().includes('build');
      
      const isModifyRequest = currentCode && (
        currentInput.toLowerCase().includes('modify') ||
        currentInput.toLowerCase().includes('change') ||
        currentInput.toLowerCase().includes('fix') ||
        currentInput.toLowerCase().includes('update') ||
        currentInput.toLowerCase().includes('refactor') ||
        currentInput.toLowerCase().includes('optimize')
      );

      let aiContent = '';
      let codeBlock: string | undefined;

      if (isGenerateRequest) {
        // Use generate endpoint
        const result = await callAIGenerate(currentInput);
        aiContent = result.description || 'Here\'s the generated code:';
        codeBlock = result.code;
      } else if (isModifyRequest && currentCode) {
        // Use modify endpoint
        const result = await callAIModify(currentCode, currentInput);
        aiContent = result.description || 'Here\'s the modified code:';
        codeBlock = result.code;
      } else {
        // Use chat endpoint for general questions
        const result = await callAIChat(currentInput, currentCode);
        const extracted = extractCodeFromResponse(result.response);
        aiContent = extracted.content;
        codeBlock = extracted.codeBlock;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiContent,
        timestamp: new Date(),
        codeBlock,
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Fallback response on error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again in a moment, or check if you\'re logged in.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    if (action.type === 'modify' && currentCode) {
      setInput(`${action.prompt}: \n\`\`\`\n${currentCode.substring(0, 500)}${currentCode.length > 500 ? '...' : ''}\n\`\`\``);
    } else {
      setInput(action.prompt);
    }
    inputRef.current?.focus();
  };

  const copyCode = async (code: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const insertCode = (code: string) => {
    onCodeGenerate(code);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-purple-400" />
          <h3 className="font-semibold text-white">AI Assistant</h3>
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="mr-1 h-3 w-3" />
            Claude
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex items-center justify-start space-x-2 text-xs h-8"
              onClick={() => handleQuickAction(action)}
            >
              <action.icon className="h-3 w-3" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'ai' && (
              <Avatar className="h-8 w-8 bg-purple-600">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {message.codeBlock && (
                <div className="mt-3">
                  <Card className="bg-gray-950 border-gray-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm text-gray-300">Generated Code</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(message.codeBlock!, message.id)}
                            className="h-6 px-2"
                          >
                            {copiedId === message.id ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => insertCode(message.codeBlock!)}
                            className="h-6 px-2 text-purple-400"
                          >
                            Insert
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <pre className="text-xs text-gray-300 overflow-x-auto">
                        <code>{message.codeBlock}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.type === 'user' && (
              <Avatar className="h-8 w-8 bg-blue-600">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex space-x-3 justify-start">
            <Avatar className="h-8 w-8 bg-purple-600">
              <AvatarFallback>
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me anything about your code..."
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 mt-2">
          Powered by Claude AI. Always review generated code.
        </p>
      </div>
    </div>
  );
}
