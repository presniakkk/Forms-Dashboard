import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { ToastContainer } from '@/components/layout/Toast';
import { AuthSync } from '@/components/layout/AuthSync';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FormBuilder',
  description: 'Manage your forms easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSync />
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}