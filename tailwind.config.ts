import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Natural Veneers Design Tokens
        bg: {
          DEFAULT: '#080a10',
          light: '#f0f2f7',
        },
        surface: {
          1: '#0d1117',
          2: '#111620',
          3: '#161c28',
          4: '#1c2334',
          'light-1': '#ffffff',
          'light-2': '#f8f9fc',
          'light-3': '#f0f4ff',
          'light-4': '#e8edf5',
        },
        border: {
          DEFAULT: '#1e2a3a',
          light: '#d1dae8',
        },
        text: {
          1: '#e4e8f0',
          2: '#8892a4',
          3: '#4a5568',
          4: '#2d3748',
          'light-1': '#0f172a',
          'light-2': '#334155',
          'light-3': '#64748b',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#5254cc',
          light: '#818cf8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        // Dept colors
        dept: {
          admin: '#3b82f6',
          digital: '#8b5cf6',
          injection: '#f59e0b',
          ceramics: '#f97316',
          qc: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.4)',
        'card-hover': '0 4px 24px rgba(99,102,241,0.15)',
        'modal': '0 20px 60px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

export default config
