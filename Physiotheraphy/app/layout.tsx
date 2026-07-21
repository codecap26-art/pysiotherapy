import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DiagnosticBot } from '@/components/ui/DiagnosticBot';
import LenisProvider from '@/components/LenisProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: { default: 'Healing Motion | Expert Physiotherapy', template: '%s | Healing Motion' },
  description: 'Professional physiotherapy with a focus on guided recovery and patient empowerment. Find the right specialist for your unique recovery journey.',
  keywords: ['physiotherapy', 'rehabilitation', 'physical therapy', 'recovery', 'sports injury'],
  openGraph: {
    siteName: 'Healing Motion',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen antialiased">
        <LenisProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <DiagnosticBot />
        </LenisProvider>
      </body>
    </html>
  );
}
