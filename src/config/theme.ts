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

  // Exact Brand Colors Extracted From Logo (Tech Navy, Circuit Green, Pure White)
  colors: {
    navy: {
      darkest: '#03101B',
      dark: '#041624',
      base: '#06223A',
      card: '#082842',
      light: '#0A3356',
      border: '#0D426E',
    },
    green: {
      base: '#22C55E',
      dark: '#16A34A',
      light: '#4ADE80',
      glow: 'rgba(34, 197, 94, 0.35)',
      subtle: 'rgba(34, 197, 94, 0.12)',
    },
    white: '#FFFFFF',
    slate: {
      light: '#F8FAFC',
      muted: '#CBD5E1',
      dim: '#94A3B8',
    },
    // Backwards-compatible aliases remapped directly to logo colors
    forest: {
      dark: '#041624',
      base: '#06223A',
      card: '#082842',
      light: '#0A3356',
    },
    clay: {
      base: '#06223A',
      dark: '#041624',
      light: '#082842',
    },
    sand: {
      base: '#22C55E',
      hover: '#16A34A',
      light: '#DCFCE7',
      dark: '#041624',
    },
    sage: {
      base: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
    },
    cream: '#FFFFFF',
  },
} as const;

export type ThemeConfig = typeof themeConfig;
