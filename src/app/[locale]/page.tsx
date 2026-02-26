'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowRight, 
  Users, 
  DollarSign, 
  Bot, 
  Code2, 
  Zap, 
  Globe,
  Star,
  Quote
} from 'lucide-react';

interface LandingPageProps {
  params: { locale: string };
}

export default function LandingPage({ params }: LandingPageProps) {
  const t = useTranslations();
  const { locale } = params;

  // Mock data
  const features = [
    {
      icon: Users,
      title: t('landing.features.collaborative.title'),
      description: t('landing.features.collaborative.description'),
    },
    {
      icon: DollarSign,
      title: t('landing.features.revenue.title'),
      description: t('landing.features.revenue.description'),
    },
    {
      icon: Bot,
      title: t('landing.features.ai.title'),
      description: t('landing.features.ai.description'),
    },
  ];

  const stats = [
    { label: 'Active Developers', value: '10,000+', icon: Users },
    { label: 'Projects Created', value: '2,500+', icon: Code2 },
    { label: 'Revenue Shared', value: '$250K+', icon: DollarSign },
    { label: 'Countries', value: '50+', icon: Globe },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Full-stack Developer',
      avatar: '/avatars/sarah.jpg',
      content: 'WikiCode changed how I approach side projects. Now I can collaborate with amazing developers worldwide and actually earn from my contributions.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Frontend Engineer',
      avatar: '/avatars/marcus.jpg',
      content: 'The AI-powered coding assistance is incredible. It\'s like having a senior developer pair programming with you 24/7.',
    },
    {
      name: 'Yuki Tanaka',
      role: 'DevOps Engineer',
      avatar: '/avatars/yuki.jpg',
      content: 'Revenue sharing based on actual contribution is revolutionary. Finally, a platform that values developers fairly.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Zap className="mr-1 h-3 w-3" />
              YouTube for Apps
            </Badge>
            
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {t('landing.hero.title')}
            </h1>
            
            <p className="mx-auto max-w-2xl text-sm text-gray-300 md:text-lg">
              {t('landing.hero.subtitle')}
            </p>
            
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-center">
              <Link href={`/${locale}/projects`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t('landing.hero.cta.start')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t('landing.hero.cta.explore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center glass-dark card-hover">
                <CardContent className="pt-6">
                  <stat.icon className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 md:text-4xl">
              {t('landing.features.title')}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="glass-dark card-hover border-0">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-xl text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20 bg-gray-900/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 md:text-4xl">
              What developers are saying
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join thousands of developers who are already building and earning together.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-dark card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Quote className="h-4 w-4 text-purple-400 mb-2" />
                  <p className="text-gray-300 italic">{testimonial.content}</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <Card className="glass-dark border-0 text-center">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold text-white mb-4 md:text-4xl">
                Ready to start building?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Join our community of developers and start creating amazing projects together.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href={`/${locale}/register`}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${locale}/projects`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Projects
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}