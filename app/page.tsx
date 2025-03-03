"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Linkedin, Phone, Mail, Github, Settings, Upload } from "lucide-react"
import { useSettings } from "@/components/SettingsContext"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { PageLoader } from "@/components/PageLoader"
import { motion, AnimatePresence } from "framer-motion"
import { SettingsPanel } from "@/components/SettingsPanel"
import { StyleProvider, StyledButton, StyledCard } from "@/components/StyleProvider"
import { ImageUploader } from "@/components/ImageUploader"

// Remove this function completely
// export default function Home() {
//   return (
//     <main className="min-h-screen">
//       <StyleDemo />
//       <SettingsPanel />
//     </main>
//   );
// }

const createVCardData = () => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Rayyaan Haamid
N:Haamid;Rayyaan;;;
TEL;TYPE=CELL:(346)2522530
END:VCARD`
  return `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`
}

export default function DigitalCard() {
  const { settings } = useSettings()
  const [isLoading, setIsLoading] = useState(true)
  const [resourcesLoaded, setResourcesLoaded] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBannerUploader, setShowBannerUploader] = useState(false)
  const [showProfileUploader, setShowProfileUploader] = useState(false)

  useEffect(() => {
    // Actually load resources
    const loadResources = async () => {
      try {
        // Preload images
        if (settings.profileImage) {
          const img = new window.Image(); // Use window.Image to be explicit
          img.src = settings.profileImage;
          await img.decode();
        }
        if (settings.bannerImage) {
          const img = new window.Image(); // Use window.Image to be explicit
          img.src = settings.bannerImage;
          await img.decode();
        }

        // Add any other resource loading here
        
        setResourcesLoaded(true);
      } catch (error) {
        console.error('Failed to load resources:', error);
        // Still set loaded to true to prevent infinite loading
        setResourcesLoaded(true);
      }
    };

    loadResources();
  }, [settings.profileImage, settings.bannerImage]);

  useEffect(() => {
    // Simpler resource loading
    const loadResources = async () => {
      try {
        // Set loaded state after a brief delay to ensure smooth transitions
        setTimeout(() => {
          setResourcesLoaded(true);
        }, 100);
      } catch (error) {
        console.error('Failed to load resources:', error);
        setResourcesLoaded(true);
      }
    };

    loadResources();
  }, [settings.profileImage, settings.bannerImage]);

  useEffect(() => {
    if (resourcesLoaded) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [resourcesLoaded]);

  // Remove the duplicate useEffect for loading

  const getThemeClass = () => {
    switch (settings.theme) {
      case "dark":
        return "bg-gray-900 text-white"
      case "light":
        return "bg-gray-100 text-gray-900"
      default:
        return "bg-[#0A0B14] text-white"
    }
  }

  // Merged pageVariants
  const pageVariants = {
    initial: { opacity: 0, y: settings.transitionStyle === 'smooth' ? 20 : 0 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: settings.transitionStyle === 'smooth' ? -20 : 0 },
  }

  const pageTransition = {
    type: "tween",
    ease: settings.transitionStyle === 'smooth' ? "easeOut" : "linear",
    duration: settings.transitionStyle === 'smooth' ? 0.6 : 0.3,
  }

  if (isLoading) {
    return <PageLoader type={settings.pageLoader} />
  }

  return (
    <AnimatePresence>
      <motion.main
        className={`min-h-screen overflow-hidden relative ${getThemeClass()}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <AnimatedBackground 
          type={settings.backgroundAnimation || "boxes"} 
          color={settings.profileColor} 
        />

        <div className="relative max-w-md mx-auto space-y-6 p-6">
          {/* Settings Navigation */}
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>

          {/* Profile Section with Banner */}
          <StyledCard
            className="overflow-hidden p-0" // Add p-0 to remove any padding
            style={{ backgroundColor: `${settings.profileColor}40` }}
          >
            {/* Banner */}
            <div className="relative h-32 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
              
              {settings.bannerImage ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${settings.bannerImage})`,
                    backgroundSize: `${(settings.bannerZoom || 1) * 100}%`,
                    transform: `translate(${settings.bannerPosition?.x || 0}px, ${settings.bannerPosition?.y || 0}px)`,
                  }}
                />
              ) : (
                <Image
                  src="/placeholder.svg?height=128&width=512"
                  alt="Profile Banner"
                  fill
                  className="object-cover w-full"
                  priority
                  sizes="(max-width: 768px) 100vw, 512px"
                />
              )}
            </div>
          
            {/* Profile Content - Keep all the existing content */}
            <div className="px-6 pb-6">
              {/* Profile Picture - Overlapping Banner */}
              <div className="relative -mt-16 mb-4 flex">
                <motion.div
                  className="relative w-28 h-28 rounded-full border-4 overflow-hidden bg-white"
                  style={{ borderColor: settings.profileColor }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {settings.profileImage ? (
                    <div 
                      className="absolute inset-0 bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${settings.profileImage})`,
                        backgroundSize: `${(settings.profileZoom || 1) * 100}%`,
                        transform: `translate(${settings.profilePosition?.x || 0}px, ${settings.profilePosition?.y || 0}px)`,
                      }}
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=112&width=112"
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                      priority
                      sizes="112px"
                    />
                  )}
                </motion.div>
              </div>

              {/* Profile Info */}
              <div className="space-y-2">
                <motion.h1
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Rayyaan Haamid
                </motion.h1>
                <motion.p
                  className="text-lg opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Student in Houston Community College
                </motion.p>
                <motion.div
                  className="flex flex-col text-base space-y-1 opacity-75"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span>Majoring in A.I and Robotics</span>
                  <span>Houston, TX</span>
                </motion.div>
              </div>
            </div>
          </StyledCard>

          {/* Skills tags section remains the same */}

          {/* Save Contact Button - Fix styling issues */}
          {/* Save Contact Button - Custom implementation with fixed border radius */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  <a href={createVCardData()} download="Rayyaan_Haamid.vcf" className="block w-full">
                    <button
                      className={`w-full text-lg font-semibold flex items-center justify-center min-h-[70px] transition-all transform hover:scale-[1.02] active:scale-[0.98]
                        ${settings.layout?.borderRadius === 'none' ? 'rounded-none' : 
                          settings.layout?.borderRadius === 'small' ? 'rounded' : 
                          settings.layout?.borderRadius === 'medium' ? 'rounded-xl' : 
                          'rounded-full'}
                        ${settings.layout?.shadowIntensity === 'none' ? 'shadow-none' : 
                          settings.layout?.shadowIntensity === 'subtle' ? 'shadow-sm' : 
                          settings.layout?.shadowIntensity === 'medium' ? 'shadow-md' : 
                          'shadow-2xl'}
                        `}
                      style={{ overflow: 'hidden' }}
                    >
                      <StyleProvider 
                        variant="button" 
                        className={`w-full h-full flex items-center justify-center py-5
                          ${settings.layout?.borderRadius === 'none' ? 'rounded-none' : 
                            settings.layout?.borderRadius === 'small' ? 'rounded' : 
                            settings.layout?.borderRadius === 'medium' ? 'rounded-xl' : 
                            'rounded-full'}
                        `}
                      >
                        Save Contact
                      </StyleProvider>
                    </button>
                  </a>
                </motion.div>

          {/* Social Links section remains the same */}
          <div className="space-y-3">
            {[
              {
                icon: <Linkedin className="h-6 w-6" />,
                label: "LinkedIn",
                value: "Rayyaan Haamid",
                href: "https://www.linkedin.com/in/rayyaan-haamid-a73523231",
              },
              {
                icon: <Phone className="h-6 w-6" />,
                label: "Phone",
                value: "(346) 252-2530",
                href: createVCardData(),
              },
              {
                icon: <Mail className="h-6 w-6" />,
                label: "Email",
                value: "rayyaan.haamid@gmail.com",
                href: "mailto:rayyaan.haamid@gmail.com",
              },
              {
                icon: <Github className="h-6 w-6" />,
                label: "GitHub",
                value: "Glumling",
                href: "https://github.com/Glumling",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <StyledCard
                  className="w-full min-h-[80px] px-6 py-4"
                  style={{ backgroundColor: `${settings.profileColor}40` }}
                >
                  <div className="flex flex-col items-start gap-1 flex-grow">
                    <div className="flex items-center gap-4 w-full">
                      {item.icon}
                      <span className="text-lg font-medium">{item.label}</span>
                    </div>
                    {item.value && <span className="opacity-75 text-base pl-10">{item.value}</span>}
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </StyledCard>
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Conditionally render settings panel */}
        <AnimatePresence>
          {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
        </AnimatePresence>
        
        {/* Image Uploaders */}
        {showBannerUploader && (
          <ImageUploader 
            type="banner" 
            onClose={() => setShowBannerUploader(false)} 
          />
        )}
        {showProfileUploader && (
          <ImageUploader 
            type="profile" 
            onClose={() => setShowProfileUploader(false)} 
          />
        )}
      </motion.main>
    </AnimatePresence>
  )
}

