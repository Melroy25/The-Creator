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
        canvas: '#090C15',
        surface: {
          DEFAULT: '#0F1424',
          1: '#131828',
          2: '#1A2138',
          3: '#242D4A',
          inset: '#0B0F1D',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          glow: 'rgba(99, 102, 241, 0.35)',
          electric: '#4D7CFF',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          violet: '#A78BFA',
        },
        tertiary: {
          DEFAULT: '#06B6D4',
          cyan: '#38BDF8',
        },
        semantic: {
          done: '#10B981',
          inProgress: '#38BDF8',
          atRisk: '#F59E0B',
          blocked: '#EF4444',
          overdue: '#F43F5E',
        },
        provenance: {
          confirmed: '#10B981',
          assumption: '#F59E0B',
          calculated: '#06B6D4',
          ai: '#A855F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '2xl': '1.125rem',
        xl: '0.875rem',
        lg: '0.625rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2)',
        'glow-primary': '0 0 24px rgba(99, 102, 241, 0.4)',
        'glow-danger': '0 0 24px rgba(239, 68, 68, 0.4)',
        'glow-success': '0 0 24px rgba(16, 185, 129, 0.35)',
        'inset-well': 'inset 2px 2px 6px rgba(0, 0, 0, 0.65), inset -1px -1px 3px rgba(255, 255, 255, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'btn-primary': 'linear-gradient(135deg, #4D7CFF 0%, #8B5CF6 100%)',
        'card-glow': 'radial-gradient(circle at top left, rgba(77, 124, 255, 0.08), transparent 40%)',
      },
    },
  },
  plugins: [],
};

export default config;
