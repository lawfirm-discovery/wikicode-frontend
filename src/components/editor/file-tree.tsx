'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isOpen?: boolean;
}

interface FileTreeProps {
  onFileSelect: (file: FileNode) => void;
  selectedFile?: string;
}

export function FileTree({ onFileSelect, selectedFile }: FileTreeProps) {
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: '2',
          name: 'components',
          type: 'folder',
          isOpen: true,
          children: [
            { id: '3', name: 'App.tsx', type: 'file' },
            { id: '4', name: 'Header.tsx', type: 'file' },
            { id: '5', name: 'Sidebar.tsx', type: 'file' },
          ],
        },
        {
          id: '6',
          name: 'hooks',
          type: 'folder',
          isOpen: false,
          children: [
            { id: '7', name: 'useAuth.ts', type: 'file' },
            { id: '8', name: 'useApi.ts', type: 'file' },
          ],
        },
        {
          id: '9',
          name: 'utils',
          type: 'folder',
          isOpen: false,
          children: [
            { id: '10', name: 'helpers.ts', type: 'file' },
            { id: '11', name: 'constants.ts', type: 'file' },
          ],
        },
        { id: '12', name: 'index.tsx', type: 'file' },
        { id: '13', name: 'App.css', type: 'file' },
      ],
    },
    {
      id: '14',
      name: 'public',
      type: 'folder',
      isOpen: false,
      children: [
        { id: '15', name: 'index.html', type: 'file' },
        { id: '16', name: 'favicon.ico', type: 'file' },
      ],
    },
    { id: '17', name: 'package.json', type: 'file' },
    { id: '18', name: 'README.md', type: 'file' },
    { id: '19', name: '.gitignore', type: 'file' },
  ]);

  const toggleFolder = (id: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.id === id && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    
    setFiles(updateNode(files));
  };

  const renderNode = (node: FileNode, depth = 0) => {
    const isSelected = selectedFile === node.id;
    
    return (
      <div key={node.id}>
        <div
          className={`flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-gray-800 group ${
            isSelected ? 'bg-purple-600/20 text-purple-300' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onFileSelect(node);
            }
          }}
        >
          {node.type === 'folder' && (
            <span className="mr-1">
              {node.isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
          
          <span className="mr-2">
            {node.type === 'folder' ? (
              node.isOpen ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )
            ) : (
              <File className="h-4 w-4" />
            )}
          </span>
          
          <span className="flex-1 text-sm">{node.name}</span>
          
          {node.type === 'folder' && (
            <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle new file
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle folder menu
                }}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        {node.type === 'folder' && node.isOpen && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-900 border-r border-gray-700">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Explorer</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-2 space-y-1 overflow-y-auto">
        {files.map(node => renderNode(node))}
      </div>
    </div>
  );
}