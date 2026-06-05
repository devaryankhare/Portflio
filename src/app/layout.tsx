import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import Spotlight from '@/components/Spotlight';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Aryan Khare | Full Stack Developer & SIH 2025 Winner',
  description:
    'Official portfolio site of Dev Aryan Khare, B.Tech Computer Science student at IIIT Bhopal, SIH 2025 Winner, and open source developer building scalable digital products.',
  keywords: [
    'Dev Aryan Khare',
    'Full Stack Developer',
    'SIH 2025 Winner',
    'IIIT Bhopal',
    'Open Source Contributor',
    'React Developer',
    'Next.js 15 Portfolio',
    'Software Engineer India',
  ],
  authors: [{ name: 'Dev Aryan Khare' }],
  creator: 'Dev Aryan Khare',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0A0A] text-[#F5F5F7] flex flex-col font-sans select-text">
        <LenisProvider>
          <Spotlight />
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
