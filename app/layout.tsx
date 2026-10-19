import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/shared/Toast';

export const metadata: Metadata = {
  title: 'Creator Flow | AI-Powered Workflow Intelligence System',
  description: 'Deterministic dependency-aware workflow adaptation for the creator economy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090C15] text-[#F1F5F9] font-sans antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
