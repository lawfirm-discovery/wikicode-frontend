import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { i18n } from '@/i18n/request';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'WikiCode - Build Together. Earn Together.',
  description: 'The collaborative coding platform where developers create, share, and monetize projects together.',
  keywords: ['coding', 'collaboration', 'programming', 'developers', 'revenue sharing'],
  authors: [{ name: 'WikiCode Team' }],
  creator: 'WikiCode',
  openGraph: {
    title: 'WikiCode - Build Together. Earn Together.',
    description: 'The collaborative coding platform where developers create, share, and monetize projects together.',
    url: 'https://wikicode.dev',
    siteName: 'WikiCode',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WikiCode - Build Together. Earn Together.',
    description: 'The collaborative coding platform where developers create, share, and monetize projects together.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950`}>
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header locale={locale} />
            <main className="flex-1">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}