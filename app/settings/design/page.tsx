"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSettings } from "@/components/SettingsContext"
import { useState } from "react"
import { motion } from "framer-motion"

const colorOptions = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
  "#84CC16",
]

const themeOptions = ["default", "dark", "light"] as const
const iconStyleOptions = ["filled", "outlined"] as const

// Define background options as an array of objects
const backgroundOptions = [
  { value: "boxes", label: "Boxes" },
  { value: "particles", label: "Particles" },
  { value: "waves", label: "Waves" },
  { value: "letterGlitch", label: "Letter Glitch" },
  { value: "honeycomb", label: "Honeycomb" },
  { value: "gridPattern", label: "Grid Pattern" },
  { value: "cubes", label: "Cubes" },
  { value: "darkPattern", label: "Dark Pattern" },
  { value: "isoCubes", label: "Isometric Cubes" },
  { value: "trianglePattern", label: "Triangle Pattern" },
  { value: "trippyCircles", label: "Trippy Circles" },
  { value: "cubicHoles", label: "Cubic Holes" }
]

// Update background animation options
const backgroundAnimationOptions = [
  "boxes",
  "particles",
  "waves",
  "letterGlitch",
  "honeycomb",
  "gridPattern",
  "cubes",
  "darkPattern",
  "isoCubes",
  "trianglePattern",
  "trippyCircles",
  "cubicHoles"
] as const
const pageLoaderOptions = ["spinner", "dots", "progress"] as const
const pageEntranceOptions = ["fade", "slide", "zoom"] as const

export default function DesignSettings() {
  const { settings, updateSettings } = useSettings()
  const [selectedColor, setSelectedColor] = useState(settings.profileColor)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    updateSettings({ profileColor: color })
  }

  const handleThemeChange = (theme: (typeof themeOptions)[number]) => {
    updateSettings({ theme })
  }

  const handleIconStyleChange = (iconStyle: (typeof iconStyleOptions)[number]) => {
    updateSettings({ iconStyle })
  }

  const handleBackgroundAnimationChange = (backgroundAnimation: (typeof backgroundAnimationOptions)[number]) => {
    updateSettings({ backgroundAnimation })
  }

  const handlePageLoaderChange = (pageLoader: (typeof pageLoaderOptions)[number]) => {
    updateSettings({ pageLoader })
  }

  const handlePageEntranceChange = (pageEntrance: (typeof pageEntranceOptions)[number]) => {
    updateSettings({ pageEntrance })
  }

  return (
    <motion.div
      className="min-h-screen bg-[#0A0B14] text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-4">Design Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Color Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-semibold mb-4">Profile Color</h2>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <motion.button
                  key={color}
                  className={`w-10 h-10 rounded-full ${color === selectedColor ? "ring-2 ring-white" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.section>

          {/* Theme Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <div className="flex space-x-2">
              {themeOptions.map((theme) => (
                <Button
                  key={theme}
                  variant={settings.theme === theme ? "default" : "outline"}
                  onClick={() => handleThemeChange(theme)}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </motion.section>

          {/* Icon Style Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-semibold mb-4">Icon Style</h2>
            <div className="flex space-x-2">
              {iconStyleOptions.map((style) => (
                <Button
                  key={style}
                  variant={settings.iconStyle === style ? "default" : "outline"}
                  onClick={() => handleIconStyleChange(style)}
                >
                  {style}
                </Button>
              ))}
            </div>
          </motion.section>

          {/* Background Animation Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-xl font-semibold mb-4">Background Animation</h2>
            <div className="grid grid-cols-2 gap-3">
              {backgroundOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={settings.backgroundAnimation === option.value ? "default" : "outline"}
                  onClick={() => updateSettings({ backgroundAnimation: option.value as any })}
                  className="justify-start"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </motion.section>

          {/* Page Loader Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-xl font-semibold mb-4">Page Loader</h2>
            <div className="flex space-x-2">
              {pageLoaderOptions.map((loader) => (
                <Button
                  key={loader}
                  variant={settings.pageLoader === loader ? "default" : "outline"}
                  onClick={() => handlePageLoaderChange(loader)}
                >
                  {loader}
                </Button>
              ))}
            </div>
          </motion.section>

          {/* Page Entrance Section */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-xl font-semibold mb-4">Page Entrance</h2>
            <div className="flex space-x-2">
              {pageEntranceOptions.map((entrance) => (
                <Button
                  key={entrance}
                  variant={settings.pageEntrance === entrance ? "default" : "outline"}
                  onClick={() => handlePageEntranceChange(entrance)}
                >
                  {entrance}
                </Button>
              ))}
            </div>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Link href="/">
              <Button className="w-full">Back to Profile</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

