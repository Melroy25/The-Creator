import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0F2F8',
        surface: {
          DEFAULT: '#F5F7FB',
          container: '#EDEFF6',
          'container-low': '#F2F4FA',
          'container-high': '#E5E8F2',
          'container-highest': '#DCDEE8',
          sidebar: '#F3F5FA',
        },
        'on-surface': '#1E2337',
        'on-surface-variant': '#64748B',
        outline: '#94A3B8',
        'outline-variant': '#CBD5E1',
        primary: {
          DEFAULT: '#6366F1',
          container: '#818cf8',
          'on-primary': '#FFFFFF',
          hover: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          container: '#A78BFA',
        },
        tertiary: {
          DEFAULT: '#0284C7',
          cyan: '#38BDF8',
        },
        semantic: {
          done: '#10B981',
          inProgress: '#6366F1',
          atRisk: '#D97706',
          blocked: '#EF4444',
          overdue: '#E11D48',
        },
        provenance: {
          confirmed: '#10B981',
          assumption: '#D97706',
          calculated: '#6366F1',
          ai: '#7C3AED',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      boxShadow: {
        'silk-card': '6px 6px 14px rgba(166, 175, 195, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.95)',
        'silk-card-sm': '4px 4px 10px rgba(166, 175, 195, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.9)',
        'silk-card-hover': '8px 8px 18px rgba(166, 175, 195, 0.5), -8px -8px 18px rgba(255, 255, 255, 0.95)',
        'silk-inset': 'inset 3px 3px 6px rgba(166, 175, 195, 0.45), inset -3px -3px 6px rgba(255, 255, 255, 0.95)',
        'silk-inset-deep': 'inset 4px 4px 8px rgba(166, 175, 195, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 1)',
        'silk-btn-primary': '4px 4px 12px rgba(99, 102, 241, 0.38), -2px -2px 6px rgba(255, 255, 255, 0.8)',
      },
      backgroundImage: {
        'silk-btn-gradient': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
