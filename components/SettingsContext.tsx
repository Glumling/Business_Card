"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

// Update type definitions to match the new background options
type ThemeOption = "default" | "dark" | "light"
type IconStyle = "filled" | "outlined"
type BackgroundAnimation = "boxes" | "particles" | "waves" | "letterGlitch" | "honeycomb" | "gridPattern" | "cubes" | "darkPattern" | "isoCubes" | "trianglePattern" | "trippyCircles" | "cubicHoles"
type PageLoader = "spinner" | "dots" | "progress" | "pulse" | "bounce" | "wave" | "ripple" | "cube" | "folding-cube" | "circle-notch" | "dual-ring" | "hourglass" | "ellipsis" | "grid" | "ring" | "heart"
type PageEntrance = "fade" | "slide" | "zoom"

// Add to the Settings interface
export interface Settings {
  theme: "default" | "dark" | "light";
  background: string;
  componentStyle: "default" | "glass" | "neomorphic" | "retro" | "minimal" | "cyber" | "material";
  animations: {
    speed: "slow" | "normal" | "fast";
    type: "bounce" | "elastic" | "smooth";
    intensity: "low" | "medium" | "high";
    pageTransition: "fade" | "slide" | "scale" | "none";
  };
  transitionStyle: "fade" | "smooth"; // Add this line as a top-level property
  layout: {
    spacing: "compact" | "comfortable" | "spacious";
    borderRadius: "none" | "small" | "medium" | "large";
    shadowIntensity: "none" | "subtle" | "medium" | "strong";
  };
  profileColor: string;
  iconStyle: IconStyle;
  backgroundAnimation: BackgroundAnimation;
  pageLoader: PageLoader;
  pageEntrance: PageEntrance;
  bannerImage?: string | null;
  bannerPosition?: { x: number; y: number };
  bannerZoom?: number;
  profileImage?: string | null;
  profilePosition?: { x: number; y: number };
  profileZoom?: number;
}

// Add to the initial settings
const initialSettings: Settings = {
  theme: "default",
  background: "honeycomb",
  componentStyle: "default",
  animations: {
    speed: "normal",
    type: "smooth",
    intensity: "medium",
    pageTransition: "fade"
  },
  transitionStyle: "smooth", // Add this line with a default value
  // In the initialSettings object
  layout: {
    spacing: "comfortable",
    borderRadius: "medium",
    shadowIntensity: "medium"
  },
  profileColor: "#3B82F6",
  iconStyle: "filled",
  backgroundAnimation: "boxes",
  pageLoader: "spinner",
  pageEntrance: "fade", // Added missing comma here
  bannerImage: null,
  bannerPosition: { x: 0, y: 0 },
  bannerZoom: 1,
  profileImage: null,
  profilePosition: { x: 0, y: 0 },
  profileZoom: 1
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings); // Changed defaultSettings to initialSettings

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

