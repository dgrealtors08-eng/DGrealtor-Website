// Responsive spacing utilities for mobile/tablet specific adjustments
// These values only affect screens below 1024px (lg breakpoint)

export const responsiveSpacing = {
  // Hero section height
  hero: {
    mobile: "85svh", // Reduced from 100svh for mobile
    tablet: "90svh", // Slightly taller for tablet
    desktop: "100svh", // Full viewport on desktop
  },

  // Section padding (top and bottom)
  section: {
    // Companies carousel section
    companies: {
      mobile: "1.5rem", // Reduced from clamp minimum of 2rem
      tablet: "2rem",
      desktop: "clamp(2rem, 5vw, 7rem)",
    },
    // About section
    about: {
      mobile: "1.5rem", // Reduced from clamp minimum of 2.5rem
      tablet: "2.5rem",
      desktop: "clamp(2.5rem, 6vw, 10rem)",
    },
    // Awards section
    awards: {
      mobile: "1.5rem", // Reduced from clamp minimum of 2.5rem
      tablet: "2.5rem",
      desktop: "clamp(2.5rem, 6vw, 8rem)",
    },
  },

  // Scroll navigation
  scrollNav: {
    buttonSize: {
      mobile: "1.5rem",
      tablet: "1.5rem",
      desktop: "2rem",
    },
    iconSize: {
      mobile: "0.75rem",
      tablet: "0.75rem",
      desktop: "1rem",
    },
    rightOffset: {
      mobile: "0.5rem",
      tablet: "0.75rem",
      desktop: "0.75rem",
    },
    // Spacing from center (top-1/2)
    upButtonOffset: {
      mobile: "-2.5rem", // Moves button up from center
      tablet: "-2.5rem",
      desktop: "-2rem",
    },
    downButtonOffset: {
      mobile: "1rem", // Moves button down from center
      tablet: "1rem",
      desktop: "0.5rem",
    },
  },
} as const
