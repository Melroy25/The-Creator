import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/shared/Toast';

export const metadata: Metadata = {
  title: 'Creator Flow | Warm Editorial Studio',
  description: 'One workspace for a creator’s brand deals, deadlines and money, with a schedule that fixes itself when plans change.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#FAF6EA] text-[#1F1F23] font-sans antialiased min-h-screen selection:bg-[#FBEFC2] selection:text-[#875C05]">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
