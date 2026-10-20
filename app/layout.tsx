import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/shared/Toast';

export const metadata: Metadata = {
  title: 'Creator Flow | Deterministic Workflow Intelligence',
  description: 'One workspace for a creator’s brand deals, deadlines and money, with a schedule that fixes itself when plans change.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#F0F2F8] text-[#1E2337] font-sans antialiased min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
