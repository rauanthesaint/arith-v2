// tailwind.config.js
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',

        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        nextui({
            prefix: 'app',
            themes: {
                light: {
                    colors: {
                        background: '#f5f5f5',
                        primary: {
                            DEFAULT: '#6366f1',
                            foreground: '#e5e5e5',
                        },
                        neutral: {
                            50: '#0a0a0a',
                            100: '#171717',
                            200: '#262626',
                            300: '#404040',
                            400: '#525252',
                            500: '#737373',
                            600: '#a3a3a3',
                            700: '#d4d4d4',
                            800: '#e5e5e5',
                            900: '#f5f5f5',
                            950: '#fafafa',
                        },
                    },
                },
                dark: {
                    colors: {
                        primary: {
                            DEFAULT: '#16a34a',
                            foreground: '#f5f5f5',
                        },
                        background: '#171717',
                        neutral: {
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
                },
            },
        }),
    ],
}

export default config
