'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Project } from '@/lib/api';
import { Users, DollarSign, Eye, GitBranch, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  locale: string;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations();

  const mockContributors = [
    { id: '1', name: 'Alice Smith', avatar: '/avatars/alice.jpg' },
    { id: '2', name: 'Bob Johnson', avatar: '/avatars/bob.jpg' },
    { id: '3', name: 'Carol Davis', avatar: '/avatars/carol.jpg' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'mobile':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'desktop':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'api':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-dark border-0 card-hover h-full flex flex-col overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl font-bold text-white/10">
              {project.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant="outline" 
            className={`border ${getCategoryColor(project.category)}`}
          >
            {t(`projects.categories.${project.category}`)}
          </Badge>
        </div>

        {/* Star Rating */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-black/50 rounded-md px-2 py-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white">4.8</span>
          </div>
        </div>
      </div>

      <CardHeader className="flex-1">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white line-clamp-1">
            {project.name}
          </h3>
          
          <p className="text-sm text-gray-300 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-xs px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                +{project.techStack.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">
              {project.contributorCount} {t('projects.contributors')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">
              {formatCurrency(project.revenue)}
            </span>
          </div>
        </div>

        {/* Contributors Avatars */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {mockContributors.slice(0, 3).map((contributor, index) => (
              <Avatar key={contributor.id} className="h-6 w-6 border-2 border-gray-800">
                <AvatarImage src={contributor.avatar} alt={contributor.name} />
                <AvatarFallback className="text-xs">
                  {contributor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.contributorCount > 3 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 border-2 border-gray-800 text-xs text-gray-300">
                +{project.contributorCount - 3}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <GitBranch className="h-3 w-3" />
            <span>12 branches</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="space-x-2">
        <Link href={`/${locale}/projects/${project.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-2 h-4 w-4" />
            {t('projects.view')}
          </Button>
        </Link>
        
        <Link href={`/${locale}/projects/${project.id}/editor`} className="flex-1">
          <Button size="sm" className="w-full">
            {t('projects.contribute')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}