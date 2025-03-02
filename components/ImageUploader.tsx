"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, X, Move, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useSettings } from "./SettingsContext"

interface ImageUploaderProps {
  type: "banner" | "profile"
  onClose: () => void
}

export const ImageUploader = ({ type, onClose }: ImageUploaderProps) => {
  const { settings, updateSettings } = useSettings()
  const [image, setImage] = useState<string | null>(
    type === "banner" ? settings.bannerImage || null : settings.profileImage || null
  )
  const [position, setPosition] = useState({ 
    x: type === "banner" ? settings.bannerPosition?.x || 0 : settings.profilePosition?.x || 0, 
    y: type === "banner" ? settings.bannerPosition?.y || 0 : settings.profilePosition?.y || 0 
  })
  const [zoom, setZoom] = useState(
    type === "banner" ? settings.bannerZoom || 1 : settings.profileZoom || 1
  )
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    setIsDragging(true)
    
    const startX = e.clientX
    const startY = e.clientY
    const startPosX = position.x
    const startPosY = position.y
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      setPosition({
        x: startPosX + deltaX,
        y: startPosY + deltaY
      })
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      setIsDragging(false)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const handleSave = () => {
    if (type === "banner") {
      updateSettings({
        bannerImage: image,
        bannerPosition: position,
        bannerZoom: zoom,
      })
    } else {
      updateSettings({
        profileImage: image,
        profilePosition: position,
        profileZoom: zoom,
      })
    }
    onClose()
  }

  const handleReset = () => {
    setImage(null)
    setPosition({ x: 0, y: 0 })
    setZoom(1)
    
    if (type === "banner") {
      updateSettings({
        bannerImage: null,
        bannerPosition: { x: 0, y: 0 },
        bannerZoom: 1,
      })
    } else {
      updateSettings({
        profileImage: null,
        profilePosition: { x: 0, y: 0 },
        profileZoom: 1,
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {type === "banner" ? "Upload Banner Image" : "Upload Profile Picture"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div 
            className={`relative overflow-hidden mb-4 ${
              type === "banner" 
                ? "h-32 w-full border border-dashed border-gray-300" 
                : "h-28 w-28 mx-auto rounded-full border border-dashed border-gray-300"
            }`}
            ref={containerRef}
          >
            {image ? (
              <div 
                ref={imageRef}
                className="absolute inset-0 cursor-move"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: `${zoom * 100}%`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            )}
            
            {/* Outline to show what will be visible */}
            <div 
              className={`absolute inset-0 border-2 border-white pointer-events-none ${
                type === "profile" ? "rounded-full" : ""
              }`}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
              />
            </div>

            {image && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Zoom</label>
                  <div className="flex items-center gap-2">
                    <ZoomOut className="h-4 w-4" />
                    <Slider
                      value={[zoom]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={handleZoomChange}
                      className="flex-1"
                    />
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <p className="text-xs text-gray-500 mb-2">
                    Drag the image to adjust position
                  </p>
                  <div className="flex items-center justify-center p-2 border rounded-md">
                    <Move className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}