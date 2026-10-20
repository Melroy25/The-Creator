import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          inset: 'var(--bg-inset)',
          'inset-deep': 'var(--bg-inset-deep)',
        },
        border: {
          DEFAULT: 'var(--border-color)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-inverse': 'var(--text-inverse)',
        
        accent: {
          DEFAULT: 'var(--accent-base)',
          base: 'var(--accent-base)',
          tint: 'var(--accent-tint)',
          strong: 'var(--accent-strong)',
          contrast: 'var(--accent-contrast)',
        },
        status: {
          'done-bg': 'var(--status-done-bg)',
          'done-text': 'var(--status-done-text)',
          'done-border': 'var(--status-done-border)',
          'done-dot': 'var(--status-done-dot)',

          'progress-bg': 'var(--status-progress-bg)',
          'progress-text': 'var(--status-progress-text)',
          'progress-border': 'var(--status-progress-border)',
          'progress-dot': 'var(--status-progress-dot)',

          'risk-bg': 'var(--status-risk-bg)',
          'risk-text': 'var(--status-risk-text)',
          'risk-border': 'var(--status-risk-border)',
          'risk-dot': 'var(--status-risk-dot)',

          'overdue-bg': 'var(--status-overdue-bg)',
          'overdue-text': 'var(--status-overdue-text)',
          'overdue-border': 'var(--status-overdue-border)',
          'overdue-dot': 'var(--status-overdue-dot)',

          'idle-bg': 'var(--status-idle-bg)',
          'idle-text': 'var(--status-idle-text)',
          'idle-border': 'var(--status-idle-border)',
          'idle-dot': 'var(--status-idle-dot)',
        },
        scrim: 'var(--scrim-color)',
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        headline: ['"Hanken Grotesk"', 'sans-serif'],
        body: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        drawer: 'var(--shadow-drawer)',
        inset: 'var(--shadow-inset)',
      },
    },
  },
  plugins: [],
};

export default config;
