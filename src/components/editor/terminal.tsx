'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Terminal as TerminalIcon, Play, Square, Maximize2, Minimize2 } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface TerminalProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function Terminal({ isMinimized = false, onToggleMinimize }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'WikiCode Terminal v1.0.0',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" for available commands.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help       - Show this help message',
      '  clear      - Clear terminal',
      '  npm start  - Start development server',
      '  npm build  - Build for production',
      '  npm test   - Run tests',
      '  git status - Show git status',
      '  ls         - List files',
      '  pwd        - Show current directory',
    ],
    clear: () => {
      setLines([]);
      return [];
    },
    'npm start': () => [
      'Starting development server...',
      '> ecotracker@1.0.0 start',
      '> react-native start',
      '',
      'info Opening Metro on port 8081...',
      'info Starting server on port 8081...',
      'success Metro is running',
    ],
    'npm build': () => [
      'Building for production...',
      '> ecotracker@1.0.0 build',
      '> react-native bundle --platform android',
      '',
      'info Building bundle...',
      'info Bundle complete',
      'success Build completed in 15.2s',
    ],
    'npm test': () => [
      'Running tests...',
      '> ecotracker@1.0.0 test',
      '> jest',
      '',
      ' PASS  src/components/__tests__/App.test.tsx',
      ' PASS  src/utils/__tests__/helpers.test.ts',
      '',
      'Test Suites: 2 passed, 2 total',
      'Tests:       15 passed, 15 total',
      'success All tests passed',
    ],
    'git status': () => [
      'On branch feature/user-dashboard',
      'Your branch is up to date with \'origin/feature/user-dashboard\'.',
      '',
      'Changes to be committed:',
      '  (use "git reset HEAD <file>..." to unstage)',
      '',
      '\tmodified:   src/components/Dashboard.tsx',
      '\tnew file:   src/components/UserProfile.tsx',
      '',
      'Changes not staged for commit:',
      '  (use "git add <file>..." to update what will be committed)',
      '',
      '\tmodified:   src/styles/global.css',
    ],
    ls: () => [
      'src/',
      'public/',
      'node_modules/',
      'package.json',
      'README.md',
      '.gitignore',
      'tsconfig.json',
    ],
    pwd: () => ['/workspace/ecotracker'],
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add command line to terminal
    const commandLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'command',
      content: `$ ${trimmedCommand}`,
      timestamp: new Date(),
    };
    
    setLines(prev => [...prev, commandLine]);
    setIsRunning(true);

    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Execute command
    const commandFunc = commands[trimmedCommand as keyof typeof commands];
    const output = commandFunc ? commandFunc() : [`Command not found: ${trimmedCommand}`];

    // Add output lines
    const outputLines: TerminalLine[] = output.map((line, index) => ({
      id: `${Date.now()}-${index}`,
      type: trimmedCommand.includes('not found') ? 'error' : 'output',
      content: line,
      timestamp: new Date(),
    }));

    setLines(prev => [...prev, ...outputLines]);
    setIsRunning(false);
  };

  const handleSubmit = () => {
    if (input.trim() && !isRunning) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (isMinimized) {
    return (
      <div className="bg-gray-900 border-t border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">Terminal</span>
            {isRunning && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onToggleMinimize}
          >
            <Maximize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-white">Terminal</span>
          {isRunning && (
            <div className="flex items-center space-x-1 text-xs text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Running</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Square className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onToggleMinimize}
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-3 overflow-y-auto font-mono text-sm"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`mb-1 ${
              line.type === 'command'
                ? 'text-green-400'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-gray-300'
            }`}
          >
            {line.content}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div className="flex items-center text-green-400">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white"
            disabled={isRunning}
            autoFocus
          />
          {isRunning && (
            <div className="ml-2 w-2 h-4 bg-green-400 animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
}