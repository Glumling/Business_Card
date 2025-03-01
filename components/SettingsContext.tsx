"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

// Update type definitions to match the new background options
type ThemeOption = "default" | "dark" | "light"
type IconStyle = "filled" | "outlined"
type BackgroundAnimation = "boxes" | "particles" | "waves" | "letterGlitch" | "honeycomb" | "gridPattern" | "cubes" | "darkPattern" | "isoCubes" | "trianglePattern" | "trippyCircles" | "cubicHoles"
type PageLoader = "spinner" | "dots" | "progress"
type PageEntrance = "fade" | "slide" | "zoom"

interface Settings {
  theme: ThemeOption
  profileColor: string
  iconStyle: IconStyle
  backgroundAnimation: BackgroundAnimation
  pageLoader: PageLoader
  pageEntrance: PageEntrance
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    profileColor: "#3B82F6",
    theme: "default",
    iconStyle: "filled",
    backgroundAnimation: "boxes",
    pageLoader: "spinner",
    pageEntrance: "fade",
  })

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

