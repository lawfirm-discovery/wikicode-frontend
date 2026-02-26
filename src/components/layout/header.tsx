'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Code2, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut,
  Search,
  Bell
} from 'lucide-react';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    isLoggedIn: true
  };

  const navigation = [
    { name: t('projects.title'), href: `/${locale}/projects` },
    { name: t('dashboard.title'), href: `/${locale}/dashboard` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-dark-950/95 backdrop-blur supports-[backdrop-filter]:bg-dark-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <Code2 className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold gradient-text">WikiCode</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="w-full rounded-lg bg-gray-900/50 border border-gray-700 pl-10 pr-4 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {user.isLoggedIn ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 border border-gray-700 shadow-lg">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href={`/${locale}/settings`}
                        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        {t('settings.title')}
                      </Link>
                      <button className="flex w-full items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link href={`/${locale}/login`}>
                <Button variant="ghost" size="sm">
                  {t('auth.login')}
                </Button>
              </Link>
              <Link href={`/${locale}/register`}>
                <Button size="sm">
                  {t('auth.register')}
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-dark-950">
          <div className="space-y-1 px-4 py-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}