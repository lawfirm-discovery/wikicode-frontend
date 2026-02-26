'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileTree } from '@/components/editor/file-tree';
import { CodeEditor } from '@/components/editor/code-editor';
import { AiChat } from '@/components/editor/ai-chat';
import { Terminal } from '@/components/editor/terminal';
import { 
  Play, 
  Save, 
  GitCommit, 
  GitBranch, 
  Settings, 
  Eye,
  Maximize2,
  Minimize2,
  RotateCcw,
  Share
} from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isOpen?: boolean;
}

interface EditorPageProps {
  params: { locale: string; id: string };
  searchParams: { branch?: string };
}

export default function EditorPage({ params, searchParams }: EditorPageProps) {
  const t = useTranslations();
  const { locale, id } = params;
  const { branch } = searchParams;

  const [selectedFile, setSelectedFile] = useState<string>('3'); // Default to App.tsx
  const [code, setCode] = useState<string>('');
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(true);
  const [isSaved, setIsSaved] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Mock file contents
  const fileContents: Record<string, string> = {
    '3': `import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';
import Sidebar from './Sidebar';

const App: React.FC = () => {
  const [user, setUser] = useState(null);
  const [carbonFootprint, setCarbonFootprint] = useState(0);

  useEffect(() => {
    // Load user data
    fetchUserData();
    calculateCarbonFootprint();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const calculateCarbonFootprint = async () => {
    try {
      const response = await fetch('/api/carbon-footprint');
      const data = await response.json();
      setCarbonFootprint(data.total);
    } catch (error) {
      console.error('Failed to calculate carbon footprint:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header user={user} />
      <View style={styles.content}>
        <Sidebar />
        <View style={styles.main}>
          <Text style={styles.title}>EcoTracker Dashboard</Text>
          <Text style={styles.footprint}>
            Carbon Footprint: {carbonFootprint} kg CO2
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  main: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  footprint: {
    fontSize: 18,
    color: '#4CAF50',
  },
});

export default App;`,
    '4': `import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EcoTracker</Text>
      <View style={styles.userSection}>
        {user ? (
          <Text style={styles.username}>Hello, {user.name}</Text>
        ) : (
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2E7D32',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userSection: {
    alignItems: 'center',
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Header;`,
    '12': `import React from 'react';
import { AppRegistry } from 'react-native';
import App from './components/App';
import { name as appName } from '../app.json';

AppRegistry.registerComponent(appName, () => App);`,
  };

  // Mock project info
  const project = {
    name: 'EcoTracker',
    branch: branch || 'main',
    lastCommit: '2 minutes ago',
    status: 'Modified',
  };

  useEffect(() => {
    // Load file content when selectedFile changes
    setCode(fileContents[selectedFile] || '// File content not found');
  }, [selectedFile]);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file.id);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setIsSaved(false);
  };

  const handleCodeGenerate = (generatedCode: string) => {
    setCode(generatedCode);
    setIsSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setIsSaved(true);
    // In real app, save to backend
    console.log('Saving file:', selectedFile, code);
  };

  const handleRun = () => {
    setIsTerminalMinimized(false);
    // Simulate running the app
    console.log('Running application');
  };

  const selectedFileName = (() => {
    const fileMap: Record<string, string> = {
      '3': 'App.tsx',
      '4': 'Header.tsx',
      '5': 'Sidebar.tsx',
      '7': 'useAuth.ts',
      '8': 'useApi.ts',
      '10': 'helpers.ts',
      '11': 'constants.ts',
      '12': 'index.tsx',
      '13': 'App.css',
      '15': 'index.html',
      '16': 'favicon.ico',
      '17': 'package.json',
      '18': 'README.md',
      '19': '.gitignore',
    };
    return fileMap[selectedFile] || 'Unknown';
  })();

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-white">{project.name}</h1>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            <GitBranch className="mr-1 h-3 w-3" />
            {project.branch}
          </Badge>
          <span className="text-sm text-gray-400">
            Last commit: {project.lastCommit}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Undo
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSave}
            disabled={isSaved}
            className={isSaved ? '' : 'border-orange-500 text-orange-300'}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>

          <Button variant="outline" size="sm" onClick={handleRun}>
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>

          <Button variant="outline" size="sm">
            <GitCommit className="mr-2 h-4 w-4" />
            Commit
          </Button>

          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex-1 flex">
        {/* File Tree */}
        <div className="w-64 min-w-64">
          <FileTree onFileSelect={handleFileSelect} selectedFile={selectedFile} />
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
            <span className="text-sm text-gray-300">{selectedFileName}</span>
            {!isSaved && (
              <div className="ml-2 w-2 h-2 bg-orange-400 rounded-full"></div>
            )}
          </div>

          {/* Editor Content */}
          <div className={`flex-1 ${isPreviewOpen ? 'flex' : ''}`}>
            <div className={`${isPreviewOpen ? 'w-1/2' : 'w-full'}`}>
              <CodeEditor
                value={code}
                onChange={handleCodeChange}
                language="typescript"
                filename={selectedFileName}
              />
            </div>

            {/* Live Preview */}
            {isPreviewOpen && (
              <div className="w-1/2 border-l border-gray-700">
                <Card className="h-full rounded-none bg-white text-black">
                  <CardHeader className="bg-gray-100 border-b">
                    <CardTitle className="text-lg">Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-green-600 text-white p-4 rounded">
                        <h2 className="text-xl font-bold">EcoTracker</h2>
                        <p>Hello, John Doe</p>
                      </div>
                      <div className="p-4">
                        <h1 className="text-2xl font-bold mb-4">EcoTracker Dashboard</h1>
                        <p className="text-green-600 text-lg">Carbon Footprint: 245 kg CO2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* AI Chat Panel */}
        <div className="w-80 min-w-80">
          <AiChat 
            onCodeGenerate={handleCodeGenerate} 
            currentCode={code}
          />
        </div>
      </div>

      {/* Terminal */}
      <div className={isTerminalMinimized ? 'h-auto' : 'h-64'}>
        <Terminal 
          isMinimized={isTerminalMinimized}
          onToggleMinimize={() => setIsTerminalMinimized(!isTerminalMinimized)}
        />
      </div>
    </div>
  );
}