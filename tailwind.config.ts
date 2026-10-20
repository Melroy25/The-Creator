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
        // Warm Editorial Studio Canvas & Surfaces
        background: '#FAF6EA',
        surface: {
          DEFAULT: '#fdf9ed',
          dim: '#dddace',
          bright: '#fdf9ed',
          'container-lowest': '#ffffff',
          'container-low': '#f7f3e7',
          container: '#f2eee2',
          'container-high': '#ece8dc',
          'container-highest': '#e6e2d7',
          card: '#FCFBF7',
          border: '#EDE6D3',
          subtle: '#F4EFE0',
          sidebar: '#FCFBF7',
        },
        'on-surface': '#1c1c15',
        'on-surface-variant': '#47464b',
        'inverse-surface': '#323129',
        'inverse-on-surface': '#f4f1e5',
        outline: '#78767b',
        'outline-variant': '#c8c5cb',
        'surface-tint': '#5f5e62',

        // Typography Colors
        'text-primary': '#1F1F23',
        'text-secondary': '#6B6558',
        'text-tertiary': '#9A9384',

        // Primary / Secondary / Tertiary
        primary: {
          DEFAULT: '#1F1F23',
          container: '#1f1f23',
          'on-primary': '#ffffff',
          'on-primary-container': '#88868b',
          pill: '#1F1F23',
          hover: '#2E2E36',
        },
        secondary: {
          DEFAULT: '#785a00',
          'on-secondary': '#ffffff',
          container: '#ffce59',
          'on-secondary-container': '#745700',
        },
        tertiary: {
          DEFAULT: '#090702',
          'on-tertiary': '#ffffff',
          container: '#231f15',
          'on-tertiary-container': '#8d8678',
        },

        // Warm Multi-Accent Studio Palette
        accent: {
          amber: '#EDBE4B',
          'amber-tint': '#FBEFC2',
          mint: '#94E0D0',
          'mint-tint': '#E2F7F2',
          pink: '#F7B3CB',
          'pink-tint': '#FDE8F0',
          blue: '#A0C9F2',
          'blue-tint': '#E5F0FC',
        },

        // Semantic Status Chips (WCAG AA paired)
        status: {
          'rose-bg': '#FBE7E9',
          'rose-text': '#9E2A2B',
          'peach-bg': '#FDECDA',
          'peach-text': '#9C4221',
          'lavender-bg': '#EDEAFB',
          'lavender-text': '#544393',
          'mint-bg': '#E1F6EE',
          'mint-text': '#1E6B52',
          'amber-bg': '#FDF3D6',
          'amber-text': '#875C05',
          'red-bg': '#FDE5E7',
          'red-text': '#A31F2A',
        },

        // Semantic & Provenance Aliases for Backward Compatibility
        semantic: {
          done: '#1E6B52',
          inProgress: '#9C4221',
          atRisk: '#875C05',
          blocked: '#A31F2A',
          overdue: '#A31F2A',
        },
        provenance: {
          confirmed: '#1E6B52',
          assumption: '#875C05',
          calculated: '#544393',
          ai: '#9C4221',
        },

        // Dark Canvas (Studio Variant)
        dark: {
          canvas: '#161512',
          surface: '#1F1D19',
          border: '#2E2A24',
          'text-primary': '#F7F5EF',
          'text-secondary': '#A8A295',
        },
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
        'studio-card': '0 2px 8px -2px rgba(60, 50, 30, 0.04), 0 6px 20px -4px rgba(60, 50, 30, 0.06)',
        'studio-card-hover': '0 4px 12px -2px rgba(60, 50, 30, 0.06), 0 12px 28px -4px rgba(60, 50, 30, 0.08)',
        'studio-drawer': '0 16px 40px -8px rgba(31, 31, 35, 0.14)',
        'studio-inset': 'inset 0 1px 3px rgba(60, 50, 30, 0.06)',
        'silk-card': '0 2px 8px -2px rgba(60, 50, 30, 0.04), 0 6px 20px -4px rgba(60, 50, 30, 0.06)',
        'silk-card-sm': '0 1px 4px rgba(60, 50, 30, 0.04)',
        'silk-card-hover': '0 4px 12px -2px rgba(60, 50, 30, 0.06), 0 12px 28px -4px rgba(60, 50, 30, 0.08)',
        'silk-inset': 'inset 0 1px 3px rgba(60, 50, 30, 0.06)',
        'silk-inset-deep': 'inset 0 1px 4px rgba(60, 50, 30, 0.08)',
        'silk-btn-primary': '0 2px 6px rgba(31, 31, 35, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
