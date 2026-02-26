'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/projects/project-card';
import { Project } from '@/lib/api';
import { Search, Filter, Plus } from 'lucide-react';

interface ProjectsPageProps {
  params: { locale: string };
}

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const t = useTranslations();
  const { locale } = params;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock projects data
  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'EcoTracker',
      description: 'A sustainability tracking app that helps users monitor their carbon footprint and environmental impact.',
      image: '/projects/ecotracker.jpg',
      category: 'mobile',
      contributorCount: 8,
      revenue: 12500,
      techStack: ['React Native', 'TypeScript', 'Node.js', 'MongoDB'],
      license: 'MIT',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-02-20T00:00:00Z',
    },
    {
      id: '2',
      name: 'DevFlow',
      description: 'A comprehensive developer workflow management tool with integrated CI/CD and team collaboration features.',
      image: '/projects/devflow.jpg',
      category: 'web',
      contributorCount: 15,
      revenue: 28900,
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
      license: 'Apache-2.0',
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-02-25T00:00:00Z',
    },
    {
      id: '3',
      name: 'CloudSync API',
      description: 'A robust API for real-time data synchronization across multiple cloud providers with automatic conflict resolution.',
      category: 'api',
      contributorCount: 6,
      revenue: 18750,
      techStack: ['Go', 'gRPC', 'Redis', 'Kubernetes'],
      license: 'BSD-3-Clause',
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-02-22T00:00:00Z',
    },
    {
      id: '4',
      name: 'DesignKit Pro',
      description: 'A desktop application for UI/UX designers with advanced prototyping tools and collaboration features.',
      category: 'desktop',
      contributorCount: 12,
      revenue: 35200,
      techStack: ['Electron', 'Vue.js', 'Rust', 'SQLite'],
      license: 'GPL-3.0',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-02-28T00:00:00Z',
    },
    {
      id: '5',
      name: 'LocalMart',
      description: 'An e-commerce platform connecting local businesses with customers in their neighborhood.',
      category: 'web',
      contributorCount: 20,
      revenue: 45600,
      techStack: ['React', 'Python', 'Django', 'PostgreSQL'],
      license: 'MIT',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-26T00:00:00Z',
    },
    {
      id: '6',
      name: 'FitnessBuddy',
      description: 'A mobile fitness companion with AI-powered workout recommendations and progress tracking.',
      category: 'mobile',
      contributorCount: 10,
      revenue: 22300,
      techStack: ['Flutter', 'Dart', 'Firebase', 'TensorFlow'],
      license: 'MIT',
      createdAt: '2024-01-12T00:00:00Z',
      updatedAt: '2024-02-24T00:00:00Z',
    },
  ];

  const categories = [
    { key: 'all', label: t('common.all') },
    { key: 'web', label: t('projects.categories.web') },
    { key: 'mobile', label: t('projects.categories.mobile') },
    { key: 'desktop', label: t('projects.categories.desktop') },
    { key: 'api', label: t('projects.categories.api') },
  ];

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('projects.title')}
            </h1>
            <p className="text-gray-300">
              {t('projects.subtitle')}
            </p>
          </div>
          
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            {t('common.new')} Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.key)}
              className="text-sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            {filteredProjects.length} projects found
          </p>
          
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            {t('common.filter')}
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
            <Search className="h-full w-full" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline">
            Clear filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredProjects.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  );
}