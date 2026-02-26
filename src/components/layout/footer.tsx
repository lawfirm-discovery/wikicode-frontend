'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();

  const footerLinks = {
    product: [
      { name: t('projects.title'), href: `/${locale}/projects` },
      { name: t('dashboard.title'), href: `/${locale}/dashboard` },
      { name: 'API', href: `/${locale}/api` },
      { name: 'Pricing', href: `/${locale}/pricing` },
    ],
    company: [
      { name: 'About', href: `/${locale}/about` },
      { name: 'Blog', href: `/${locale}/blog` },
      { name: 'Careers', href: `/${locale}/careers` },
      { name: 'Press', href: `/${locale}/press` },
    ],
    support: [
      { name: 'Help Center', href: `/${locale}/help` },
      { name: 'Contact', href: `/${locale}/contact` },
      { name: 'Status', href: `/${locale}/status` },
      { name: 'Community', href: `/${locale}/community` },
    ],
    legal: [
      { name: 'Privacy', href: `/${locale}/privacy` },
      { name: 'Terms', href: `/${locale}/terms` },
      { name: 'Security', href: `/${locale}/security` },
      { name: 'Cookies', href: `/${locale}/cookies` },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/wikicode' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/wikicode' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/wikicode' },
  ];

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-6">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold gradient-text">WikiCode</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              The collaborative coding platform where developers create, share, and monetize projects together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 WikiCode. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}