"use client"

import type React from "react"
import { motion } from "framer-motion"
import LetterGlitch from './blocks/Backgrounds/LetterGlitch/LetterGlitch'
import { useSettings } from "./SettingsContext"

// Helper function to convert hex color to RGB array
const hexToRgb = (hex: string): [number, number, number] => {
  // Remove # if present
  hex = hex.replace('#', '')
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  return [r, g, b]
}

// Update the interface to include new background types
interface AnimatedBackgroundProps {
  type: "boxes" | "particles" | "waves" | "letterGlitch" | "honeycomb" | "gridPattern" | "cubes" | "darkPattern" | "isoCubes" | "trianglePattern" | "trippyCircles" | "cubicHoles"
  color?: string
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ type, color }) => {
  const { settings } = useSettings()
  
  switch (type) {
    case "boxes":
      return <BoxesBackground />
    case "particles":
      return <ParticlesBackground />
    case "waves":
      return <WavesBackground />
    case "letterGlitch":
      return <LetterGlitchBackground theme={settings.theme} />
    case "honeycomb":
      return <HoneycombBackground theme={settings.theme} />
    case "gridPattern":
      return <GridPatternBackground theme={settings.theme} />
    case "cubes":
      return <CubesBackground theme={settings.theme} />
    case "darkPattern":
      return <DarkPatternBackground theme={settings.theme} />
    case "isoCubes":
      return <IsoCubesBackground theme={settings.theme} />
    case "trianglePattern":
      return <TrianglePatternBackground theme={settings.theme} />
    case "trippyCircles":
      return <TrippyCirclesBackground theme={settings.theme} />
    case "cubicHoles":
      return <CubicHolesBackground theme={settings.theme} />
    default:
      return null
  }
}

// Add the new LetterGlitchBackground component
// Update the LetterGlitchBackground component
const LetterGlitchBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colorSchemes = {
    light: ['#505050', '#404040', '#303030'], // Darker colors for better visibility
    dark: ['#121212', '#1e1e1e', '#2a2a2a'],
    default: ['#0A0B14', '#161827', '#1f2235']
  }
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '150%',
      height: '150%',
      zIndex: -1,
      backgroundColor: theme === 'light' ? '#404040' : '#121212'
    }}>
      <LetterGlitch
        glitchSpeed={30} // Reduced for smoother effect
        centerVignette={false} // Disabled to prevent cutoff
        outerVignette={false}
        smooth={true}
        glitchColors={colorSchemes[theme]}
      />
    </div>
  )
}

// Also update the other background components with the same container class
const BoxesBackground = () => (
  <div className="fixed inset-0 w-screen h-screen grid grid-cols-6 grid-rows-6 gap-4 p-4 opacity-20">
    {[...Array(36)].map((_, i) => (
      <motion.div
        key={i}
        className="border border-current rounded-sm"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20 + Math.random() * 10,
          repeat: Number.POSITIVE_INFINITY,
          delay: Math.random() * -20,
        }}
      />
    ))}
  </div>
)

const ParticlesBackground = () => (
  <div className="fixed inset-0 w-screen h-screen">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-current rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        transition={{
          duration: 10 + Math.random() * 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ opacity: 0.2 + Math.random() * 0.3 }}
      />
    ))}
  </div>
)

const WavesBackground = () => (
  <div className="fixed inset-0 w-screen h-screen overflow-hidden">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bottom-0 left-0 right-0 h-64 bg-current"
        initial={{ y: "100%" }}
        animate={{
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{
          duration: 10 + i * 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          opacity: 0.1 - i * 0.02,
          transform: `scaleY(${1 - i * 0.2})`,
        }}
      />
    ))}
  </div>
)
// Honeycomb background
const HoneycombBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      bg: '#f5f5f5',
      hex: '#d0d0d0'
    },
    dark: {
      bg: '#1e1e1e',
      hex: '#282828'
    },
    default: {
      bg: '#0A0B14',
      hex: '#161827'
    }
  }
  
  const themeColors = colors[theme]
  const s = '37px'
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: themeColors.bg,
      background: `
        conic-gradient(from 60deg at 56.25% calc(425% / 6), #0000, ${themeColors.hex} 0.5deg 119.5deg, #0000 120deg),
        conic-gradient(from 60deg at 56.25% calc(425% / 6), #0000, ${themeColors.hex} 0.5deg 119.5deg, #0000 120deg) ${s} calc(1.73 * ${s}),
        conic-gradient(from 180deg at 43.75% calc(425% / 6), #0000, ${themeColors.hex} 0.5deg 119.5deg, #0000 120deg),
        conic-gradient(from 180deg at 43.75% calc(425% / 6), #0000, ${themeColors.hex} 0.5deg 119.5deg, #0000 120deg) ${s} calc(1.73 * ${s}),
        conic-gradient(from -60deg at 50% calc(175% / 12), #0000, ${themeColors.hex} 0.5deg 119.5deg, #0000 120deg) ${s} 0,
        conic-gradient(from -60deg at 50% calc(175% / 12), #0000, ${themeColors.hex} 0.5deg 119.5deg, #0000 120deg) 0 calc(1.73 * ${s})
      `,
      backgroundSize: `calc(2 * ${s}) calc(3.46 * ${s})`
    }}>
    </div>
  )
}

// Grid pattern background
const GridPatternBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      bg: '#f0f0f0',
      line: 'rgba(0, 0, 0, 0.1)'
    },
    dark: {
      bg: '#000000',
      line: 'rgba(255, 255, 255, 0.1)'
    },
    default: {
      bg: '#0A0B14',
      line: 'rgba(255, 255, 255, 0.05)'
    }
  }
  
  const themeColors = colors[theme]
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: themeColors.bg,
      backgroundImage: `linear-gradient(${themeColors.line} 1px, transparent 1px),
        linear-gradient(90deg, ${themeColors.line} 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }}>
    </div>
  )
}

// Cubes background
const CubesBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      c1: '#d9d9d9',
      c2: '#b2b2b2',
      c3: '#999999'
    },
    dark: {
      c1: '#2a2a2a',
      c2: '#1e1e1e',
      c3: '#121212'
    },
    default: {
      c1: '#161827',
      c2: '#0A0B14',
      c3: '#1f2235'
    }
  }
  
  const themeColors = colors[theme]
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: themeColors.c2,
      backgroundImage: `linear-gradient(30deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(150deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(30deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(150deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(60deg, ${themeColors.c3} 25%, transparent 25.5%, transparent 75%, ${themeColors.c3} 75%, ${themeColors.c3})`,
      backgroundSize: '80px 140px'
    }}>
    </div>
  )
}

// Dark pattern background
const DarkPatternBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      bg: 'bg-gradient-to-t to-gray-50 from-white',
      grid: '#4f4f4f2e'
    },
    dark: {
      bg: 'bg-gradient-to-t to-gray-800 from-gray-950',
      grid: '#4f4f4f2e'
    },
    default: {
      bg: 'bg-gradient-to-t to-[#161827] from-[#0A0B14]',
      grid: '#4f4f4f2e'
    }
  }
  
  const themeColors = colors[theme]
  
  return (
    <div className={`fixed inset-0 w-full h-full ${themeColors.bg}`}>
      <div
        className="absolute inset-0 z-40 pointer-events-none select-none repeat-infinite invert dark:invert-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3e%3ctitle%3enoise%3c/title%3e%3cdefs%3e%3cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.2' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'/%3e%3cfeSpecularLighting surfaceScale='5' specularConstant='0.8' specularExponent='20' lighting-color='white' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3e%3cfeDistantLight azimuth='3' elevation='96'/%3e%3c/feSpecularLighting%3e%3cfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'/%3e%3c/filter%3e%3c/defs%3e%3crect width='700' height='700' fill='black'/%3e%3crect width='700' height='700' fill='white' filter='url(%23nnnoise-filter)'/%3e%3c/svg%3e")`,
          backgroundSize: '400px',
          opacity: 0.1,
        }}
      />
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(to right, ${themeColors.grid} 1px, transparent 1px), linear-gradient(to bottom, ${themeColors.grid} 1px, transparent 1px)`,
          backgroundSize: '35px 34px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />
    </div>
  )
}

// Isometric cubes background
const IsoCubesBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      c1: '#d9d9d9',
      c2: '#f0f0f0',
      c3: '#b2b2b2'
    },
    dark: {
      c1: '#1d1d1d',
      c2: '#4e4f51',
      c3: '#3c3c3c'
    },
    default: {
      c1: '#0A0B14',
      c2: '#161827',
      c3: '#1f2235'
    }
  }
  
  const themeColors = colors[theme]
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: theme === 'light' ? '#e5e5e5' : '#222222',
      backgroundImage: `
        linear-gradient(30deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(150deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(30deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(150deg, ${themeColors.c1} 12%, transparent 12.5%, transparent 87%, ${themeColors.c1} 87.5%, ${themeColors.c1}),
        linear-gradient(60deg, ${themeColors.c3} 25%, transparent 25.5%, transparent 75%, ${themeColors.c3} 75%, ${themeColors.c3})
      `,
      backgroundSize: '40px 70px',
      backgroundPosition: '0 0, 0 0, 20px 35px, 20px 35px, 0 0'
    }}>
    </div>
  )
}

// Triangle pattern background
const TrianglePatternBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      c1: '#f2f2f2',
      c2: '#cdcbcc',
      c3: '#999999'
    },
    dark: {
      c1: '#2a2a2a',
      c2: '#1e1e1e',
      c3: '#121212'
    },
    default: {
      c1: '#1f2235',
      c2: '#161827',
      c3: '#0A0B14'
    }
  }
  
  const themeColors = colors[theme]
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundImage: `
        conic-gradient(from 0deg at calc(500% / 6) calc(100% / 3), ${themeColors.c3} 0 120deg, #0000 0),
        conic-gradient(from -120deg at calc(100% / 6) calc(100% / 3), ${themeColors.c2} 0 120deg, #0000 0),
        conic-gradient(from 120deg at calc(100% / 3) calc(500% / 6), ${themeColors.c1} 0 120deg, #0000 0),
        conic-gradient(from 120deg at calc(200% / 3) calc(500% / 6), ${themeColors.c1} 0 120deg, #0000 0),
        conic-gradient(from -180deg at calc(100% / 3) 50%, ${themeColors.c2} 60deg, ${themeColors.c1} 0 120deg, #0000 0),
        conic-gradient(from 60deg at calc(200% / 3) 50%, ${themeColors.c1} 60deg, ${themeColors.c3} 0 120deg, #0000 0),
        conic-gradient(from -60deg at 50% calc(100% / 3), ${themeColors.c1} 120deg, ${themeColors.c2} 0 240deg, ${themeColors.c3} 0)
      `,
      backgroundSize: 'calc(84px * 1.732) 84px'
    }}>
    </div>
  )
}

// Trippy circles background
const TrippyCirclesBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      c1: '#e0e0e0',
      c2: '#b0b0b0',
      c3: '#d0d0d0'
    },
    dark: {
      c1: '#2a2a2a',
      c2: '#1a1a1a',
      c3: '#333333'
    },
    default: {
      c1: '#161827',
      c2: '#0A0B14',
      c3: '#1f2235'
    }
  }
  
  const themeColors = colors[theme]
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: themeColors.c2,
      backgroundImage: `
        radial-gradient(circle at 50% 50%, ${themeColors.c1} 20%, transparent 20%),
        radial-gradient(circle at 0% 50%, ${themeColors.c1} 10%, transparent 10%),
        radial-gradient(circle at 100% 50%, ${themeColors.c1} 10%, transparent 10%),
        radial-gradient(circle at 0% 0%, ${themeColors.c1} 10%, transparent 10%),
        radial-gradient(circle at 100% 0%, ${themeColors.c1} 10%, transparent 10%),
        radial-gradient(circle at 0% 100%, ${themeColors.c1} 10%, transparent 10%),
        radial-gradient(circle at 100% 100%, ${themeColors.c1} 10%, transparent 10%),
        radial-gradient(circle at 50% 0%, ${themeColors.c3} 30%, transparent 30%),
        radial-gradient(circle at 50% 100%, ${themeColors.c3} 30%, transparent 30%)
      `,
      backgroundSize: '100px 100px, 50px 50px, 50px 50px, 50px 50px, 50px 50px, 50px 50px, 50px 50px, 100px 100px, 100px 100px',
      backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0'
    }}>
    </div>
  )
}

// Cubic holes background
const CubicHolesBackground: React.FC<{ theme: "default" | "dark" | "light" }> = ({ theme }) => {
  const colors = {
    light: {
      c1: '#7f727b',
      c2: '#d6b4c2',
      c3: '#baa0ab'
    },
    dark: {
      c1: '#7f727b',
      c2: '#d6b4c2',
      c3: '#baa0ab'
    },
    default: {
      c1: '#7f727b',
      c2: '#d6b4c2',
      c3: '#baa0ab'
    }
  }
  
  const themeColors = colors[theme]
  const s = '111px'
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: `
        linear-gradient(145deg, ${themeColors.c1} 10%, ${themeColors.c2} 10.5% 19%, #0000 19.5% 80.5%, ${themeColors.c2} 81% 89.5%, ${themeColors.c3} 90%),
        linear-gradient(145deg, ${themeColors.c1} 10%, ${themeColors.c2} 10.5% 19%, #0000 19.5% 80.5%, ${themeColors.c2} 81% 89.5%, ${themeColors.c3} 90%) calc(${s} / 2) ${s},
        linear-gradient(35deg, ${themeColors.c1} 10%, ${themeColors.c2} 10.5% 19%, #0000 19.5% 80.5%, ${themeColors.c2} 81% 89.5%, ${themeColors.c3} 90%),
        linear-gradient(35deg, ${themeColors.c1} 10%, ${themeColors.c2} 10.5% 19%, #0000 19.5% 80.5%, ${themeColors.c2} 81% 89.5%, ${themeColors.c3} 90%) calc(${s} / 2) ${s},
        conic-gradient(from -90deg at 37.5% 50%, #0000 75%, ${themeColors.c1} 0) calc(${s} / 8) 0,
        conic-gradient(from -90deg at 37.5% 50%, #0000 75%, ${themeColors.c3} 0) calc(${s} / 2) 0,
        linear-gradient(90deg, ${themeColors.c3} 38%, ${themeColors.c1} 0 50%, ${themeColors.c3} 0 62%, ${themeColors.c1} 0)
      `,
      backgroundSize: `${s} calc(2 * ${s} / 3)`
    }}>
    </div>
  )
}

