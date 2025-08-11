/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem',  
        'icon': '0.75rem',
      },
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
        'section': '5rem',    // 80px - py-20 estándar
        'section-sm': '4rem', // 64px - py-16 para contenido compacto  
        'section-lg': '6rem', // 96px - py-24 para secciones hero
      },
      maxWidth: {
        'container-sm': '48rem',    // 768px - Para contenido angosto
        'container': '64rem',       // 1024px - Para contenido principal
        'container-lg': '80rem',    // 1280px - Para contenido ancho
        'container-xl': '90rem',    // 1440px - Para contenido extra ancho
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      lineHeight: {
        'relaxed': '1.7',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}