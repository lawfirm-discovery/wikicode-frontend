'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  GitBranch, 
  Users, 
  DollarSign, 
  ExternalLink, 
  Code2, 
  Play,
  Download,
  Share,
  Heart,
  Eye
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ProjectDetailPageProps {
  params: { locale: string; id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const t = useTranslations();
  const { locale, id } = params;
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data
  const project = {
    id,
    name: 'EcoTracker',
    description: 'A comprehensive sustainability tracking application that helps users monitor their carbon footprint, track environmental impact, and discover eco-friendly alternatives for daily activities.',
    category: 'mobile',
    image: '/projects/ecotracker.jpg',
    techStack: ['React Native', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase'],
    license: 'MIT',
    stars: 234,
    forks: 45,
    contributorCount: 8,
    revenue: 12500,
    readme: `# EcoTracker

## Overview
EcoTracker is a mobile application designed to help individuals track and reduce their environmental impact...

## Features
- Carbon footprint tracking
- Eco-friendly recommendations
- Community challenges
- Progress analytics

## Installation
\`\`\`bash
npm install
npm start
\`\`\``,
  };

  const branches = [
    { id: '1', name: 'main', description: 'Production branch', previewUrl: 'https://ecotracker-main.preview.dev', isDefault: true },
    { id: '2', name: 'feature/user-dashboard', description: 'Enhanced user dashboard', previewUrl: 'https://ecotracker-dashboard.preview.dev', isDefault: false },
    { id: '3', name: 'feature/social-sharing', description: 'Social sharing features', previewUrl: 'https://ecotracker-social.preview.dev', isDefault: false },
  ];

  const contributors = [
    { id: '1', name: 'Alice Chen', avatar: '/avatars/alice.jpg', contribution: 35, role: 'Lead Developer', earnings: 4375 },
    { id: '2', name: 'Bob Wilson', avatar: '/avatars/bob.jpg', contribution: 25, role: 'Backend Developer', earnings: 3125 },
    { id: '3', name: 'Carol Davis', avatar: '/avatars/carol.jpg', contribution: 20, role: 'UI/UX Designer', earnings: 2500 },
    { id: '4', name: 'David Kim', avatar: '/avatars/david.jpg', contribution: 10, role: 'QA Engineer', earnings: 1250 },
    { id: '5', name: 'Eva Rodriguez', avatar: '/avatars/eva.jpg', contribution: 10, role: 'DevOps', earnings: 1250 },
  ];

  const revenueData = contributors.map(c => ({
    name: c.name,
    value: c.contribution,
    earnings: c.earnings
  }));

  const activityData = [
    { month: 'Jan', contributions: 45, revenue: 2800 },
    { month: 'Feb', contributions: 52, revenue: 3200 },
    { month: 'Mar', contributions: 38, revenue: 2400 },
    { month: 'Apr', contributions: 65, revenue: 4100 },
    { month: 'May', contributions: 48, revenue: 3000 },
    { month: 'Jun', contributions: 72, revenue: 4500 },
  ];

  const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'branches', label: 'Branches' },
    { key: 'contributors', label: 'Contributors' },
    { key: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-white">{project.name}</h1>
              <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                {project.category}
              </Badge>
            </div>
            
            <p className="text-gray-300 text-lg mb-4 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {project.stars}
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="h-4 w-4" />
                {project.forks}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {project.contributorCount} contributors
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                ${project.revenue.toLocaleString()} revenue
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-fit">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Star
              </Button>
              <Button variant="outline" size="sm">
                <GitBranch className="mr-2 h-4 w-4" />
                Fork
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            
            <Link href={`/${locale}/projects/${id}/editor`}>
              <Button size="lg" className="w-full">
                <Code2 className="mr-2 h-5 w-5" />
                {t('projects.contribute')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <Card className="glass-dark border-0">
          <CardHeader>
            <CardTitle className="text-lg text-white">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="glass-dark border-0">
                <CardHeader>
                  <CardTitle className="text-white">README</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300">
                      {project.readme}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-dark border-0">
                <CardHeader>
                  <CardTitle className="text-white">Project Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">License</span>
                    <Badge variant="outline">{project.license}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Revenue</span>
                    <span className="text-white font-semibold">
                      ${project.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Contributors</span>
                    <span className="text-white font-semibold">
                      {project.contributorCount}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-dark border-0">
                <CardHeader>
                  <CardTitle className="text-white">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contributors.slice(0, 3).map((contributor) => (
                      <div key={contributor.id} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={contributor.avatar} alt={contributor.name} />
                          <AvatarFallback>
                            {contributor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {contributor.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {contributor.contribution}% contribution
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'branches' && (
          <div className="grid gap-4">
            {branches.map((branch) => (
              <Card key={branch.id} className="glass-dark border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{branch.name}</h3>
                        {branch.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-300">{branch.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {branch.previewUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={branch.previewUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="mr-2 h-4 w-4" />
                            Preview
                          </a>
                        </Button>
                      )}
                      <Link href={`/${locale}/projects/${id}/editor?branch=${branch.id}`}>
                        <Button size="sm">
                          <Code2 className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'contributors' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="glass-dark border-0">
                <CardHeader>
                  <CardTitle className="text-white">Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contributors.map((contributor) => (
                      <div key={contributor.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={contributor.avatar} alt={contributor.name} />
                            <AvatarFallback>
                              {contributor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-white">{contributor.name}</h4>
                            <p className="text-sm text-gray-400">{contributor.role}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white font-semibold">{contributor.contribution}%</p>
                          <p className="text-sm text-gray-400">${contributor.earnings.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-dark border-0">
                <CardHeader>
                  <CardTitle className="text-white">Contribution Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => [`${value}%`, 'Contribution']}
                          labelStyle={{ color: '#fff' }}
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid gap-6">
            <Card className="glass-dark border-0">
              <CardHeader>
                <CardTitle className="text-white">Activity & Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="contributions" fill="#7c3aed" name="Contributions" />
                      <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}