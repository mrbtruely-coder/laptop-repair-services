/**
 * Global Theme Configuration
 * Centrally manages global typography, fonts, weights, tracking, and color tokens.
 */

export const themeConfig = {
  // Global Typography Fonts
  fonts: {
    // Primary heading font for titles, badges, and prominent numbers
    heading: "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    
    // Primary body font for clean readability across all pages, forms, and descriptions
    sans: "'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    
    // Display font for hero titles and section banners
    display: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    
    // Monospace font for ticket IDs & numbers
    mono: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },

  // Font Weights
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Letter Spacing (Tracking)
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line Heights
  lineHeights: {
    tight: '1.15',
    snug: '1.3',
    relaxed: '1.6',
    loose: '1.8',
  },

  // Core Organic Tactile Nature Palette (NO Blue and White)
  colors: {
    forest: {
      dark: '#12231A',
      base: '#183023',
      card: '#203F30',
      light: '#2A523F',
    },
    clay: {
      base: '#6E4331',
      dark: '#4A2B1D',
      light: '#8E5841',
    },
    sand: {
      base: '#E2B98E',
      hover: '#D5A472',
      light: '#F4E7D7',
      dark: '#24160E',
    },
    sage: {
      base: '#7AA27D',
      light: '#9BBF9C',
      dark: '#466949',
    },
    cream: '#FAF6F0',
  },
} as const;

export type ThemeConfig = typeof themeConfig;
