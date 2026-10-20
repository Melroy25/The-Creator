import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/shared/Toast';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

export const metadata: Metadata = {
  title: 'Creator Flow | Autonomous Creator Business OS',
  description: 'One workspace for a creator’s brand deals, deadlines and money, with a schedule that fixes itself when plans change.',
};

const themeInitScript = `
(function() {
  try {
    var storedTheme = localStorage.getItem('creator_flow_theme') || 'light';
    var storedAccent = localStorage.getItem('creator_flow_accent') || 'amber';
    
    var resolvedTheme = storedTheme;
    if (storedTheme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.setAttribute('data-accent', storedAccent);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-canvas text-text-primary font-sans antialiased min-h-screen selection:bg-accent-tint selection:text-accent-strong">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
