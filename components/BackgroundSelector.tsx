"use client"

import React from "react"
import { useSettings } from "./SettingsContext"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

export const BackgroundSelector: React.FC = () => {
  const { settings, updateSettings } = useSettings()

  const handleBackgroundChange = (value: string) => {
    updateSettings({ 
      backgroundAnimation: value as any 
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Background Animation</h3>
      <RadioGroup 
        value={settings.backgroundAnimation} 
        onValueChange={handleBackgroundChange}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="boxes" id="boxes" />
          <Label htmlFor="boxes">Boxes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="particles" id="particles" />
          <Label htmlFor="particles">Particles</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="waves" id="waves" />
          <Label htmlFor="waves">Waves</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dither" id="dither" />
          <Label htmlFor="dither">Dither</Label>
        </div>
      </RadioGroup>
    </div>
  )
}