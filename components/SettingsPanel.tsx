import { useSettings } from './SettingsContext';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { StyleProvider } from './StyleProvider';
import { ImageUploader } from './ImageUploader';

interface SettingsPanelProps {
  onClose?: () => void;
}

// Add state for image uploaders at the top of the component
export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const { settings, updateSettings } = useSettings();
  const [showBannerUploader, setShowBannerUploader] = useState(false);
  const [showProfileUploader, setShowProfileUploader] = useState(false);
  
  // Create a helper function to safely handle undefined settings
  const getSettingValue = (path: string, defaultValue: string) => {
    const parts = path.split('.');
    let current: any = settings;
    
    for (const part of parts) {
      if (current === undefined || current === null) {
        return defaultValue;
      }
      current = current[part];
    }
    
    return current || defaultValue;
  };
  
  // Helper function to safely update nested settings
  const updateNestedSettings = (path: string[], value: any) => {
    if (path.length === 1) {
      updateSettings({ [path[0]]: value });
      return;
    }
    
    // For nested properties like animations.speed
    const [parent, ...rest] = path;
    // Use type assertion to tell TypeScript this is a valid access
    const currentParent = (settings as any)[parent] || {};
    
    let newValue = { ...currentParent };
    let current = newValue;
    
    // Navigate to the deepest level except the last one
    for (let i = 0; i < rest.length - 1; i++) {
      const key = rest[i];
      current[key] = current[key] || {};
      current = current[key];
    }
    
    // Set the value at the last level
    current[rest[rest.length - 1]] = value;
    
    // Update the settings with the new parent object
    updateSettings({ [parent]: newValue });
  };
  
  return (
    <div className="fixed inset-y-0 right-0 z-50 flex items-stretch">
      <div 
        className="bg-black/20 backdrop-blur-sm w-screen md:w-16"
        onClick={onClose}
      />
      <div className="bg-background text-foreground w-[90vw] max-w-md flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Settings</h2>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* Profile Color Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Profile Color</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-2">
                {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'].map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${settings.profileColor === color ? 'border-white ring-2 ring-black/20' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateSettings({ profileColor: color })}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.profileColor || '#3B82F6'}
                    onChange={(e) => updateSettings({ profileColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.profileColor || '#3B82F6'}
                    onChange={(e) => updateSettings({ profileColor: e.target.value })}
                    className="flex-1 p-2 rounded-lg bg-background border border-input text-foreground"
                    placeholder="Enter hex color"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Color Shades</label>
                <div className="grid grid-cols-5 gap-2">
                  {[0.2, 0.4, 0.6, 0.8, 1].map(opacity => {
                    const color = settings.profileColor || '#3B82F6';
                    return (
                      <button
                        key={opacity}
                        className="w-full h-8 rounded border border-gray-300"
                        style={{ backgroundColor: `${color}${Math.round(opacity * 100)}` }}
                        onClick={() => updateSettings({ profileColor: color })}
                        aria-label={`Select ${color} with opacity ${opacity}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Page Loader Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Page Loader</h3>
            <select 
              value={getSettingValue('pageLoader', 'spinner')}
              onChange={(e) => updateNestedSettings(['pageLoader'], e.target.value)}
              className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
            >
              <option value="spinner">Spinner</option>
              <option value="dots">Dots</option>
              <option value="progress">Progress Bar</option>
              <option value="pulse">Pulse</option>
              <option value="bounce">Bounce</option>
              <option value="wave">Wave</option>
              <option value="ripple">Ripple</option>
              <option value="cube">3D Cube</option>
              <option value="folding-cube">Folding Cube</option>
              <option value="circle-notch">Circle Notch</option>
              <option value="dual-ring">Dual Ring</option>
              <option value="hourglass">Hourglass</option>
              <option value="ellipsis">Ellipsis</option>
              <option value="grid">Grid</option>
              <option value="ring">Ring</option>
              <option value="heart">Heart Beat</option>
            </select>
          </div>

          {/* Theme Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Theme</h3>
            <select 
              value={getSettingValue('theme', 'default')}
              onChange={(e) => updateNestedSettings(['theme'], e.target.value)}
              className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
            >
              <option value="default">Default</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Icon Style Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Icon Style</h3>
            <select 
              value={getSettingValue('iconStyle', 'filled')}
              onChange={(e) => updateNestedSettings(['iconStyle'], e.target.value)}
              className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
            >
              <option value="filled">Filled</option>
              <option value="outlined">Outlined</option>
            </select>
          </div>
          {/* Component Style Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Component Style</h3>
            <select 
              value={getSettingValue('componentStyle', 'default')}
              onChange={(e) => updateNestedSettings(['componentStyle'], e.target.value)}
              className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
            >
              <option value="default">Default</option>
              <option value="glass">Glassmorphism</option>
              <option value="neomorphic">Neumorphic</option>
              <option value="retro">Retro/Synthwave</option>
              <option value="minimal">Minimal</option>
              <option value="cyber">Cyberpunk</option>
              <option value="material">Material Design</option>
            </select>
            
            {/* Style Preview */}
            <div className="mt-2">
              <label className="text-sm font-medium">Preview with {settings.profileColor} color</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <StyleProvider className="p-3 rounded-lg h-20 flex items-center justify-center">
                  <span>Card</span>
                </StyleProvider>
                <StyleProvider className="p-3 rounded-lg h-20 flex items-center justify-center" variant="button">
                  <span>Button</span>
                </StyleProvider>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {settings.componentStyle === 'neomorphic' || settings.componentStyle === 'retro' 
                  ? 'This style uses fixed colors' 
                  : 'This style adapts to your profile color'}
              </p>
            </div>
          </div>
          {/* Profile Image Settings */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Profile Images</h3>
            
            {/* Banner Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Banner Image</label>
              <div className="relative h-20 w-full overflow-hidden rounded-md border border-gray-300">
                {settings.bannerImage ? (
                  <div 
                    className="h-full w-full bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${settings.bannerImage})`,
                      backgroundSize: `${(settings.bannerZoom || 1) * 100}%`,
                      transform: `translate(${settings.bannerPosition?.x || 0}px, ${settings.bannerPosition?.y || 0}px)`,
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm text-gray-500">No banner image</span>
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowBannerUploader(true)}
              >
                {settings.bannerImage ? "Change Banner Image" : "Upload Banner Image"}
              </Button>
            </div>
            
            {/* Profile Picture */}
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium">Profile Picture</label>
              <div className="flex justify-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-300">
                  {settings.profileImage ? (
                    <div 
                      className="h-full w-full bg-center bg-no-repeat bg-cover"
                      style={{
                        backgroundImage: `url(${settings.profileImage})`,
                        backgroundSize: `${(settings.profileZoom || 1) * 100}%`,
                        transform: `translate(${settings.profilePosition?.x || 0}px, ${settings.profilePosition?.y || 0}px)`,
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <span className="text-xs text-gray-500">No image</span>
                    </div>
                  )}
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowProfileUploader(true)}
              >
                {settings.profileImage ? "Change Profile Picture" : "Upload Profile Picture"}
              </Button>
            </div>
          </div>

          {/* Background Animation Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Background Animation</h3>
            <select 
              value={getSettingValue('backgroundAnimation', 'boxes')}
              onChange={(e) => updateNestedSettings(['backgroundAnimation'], e.target.value)}
              className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
            >
              <option value="boxes">Boxes</option>
              <option value="particles">Particles</option>
              <option value="waves">Waves</option>
              <option value="letterGlitch">Letter Glitch</option>
              <option value="honeycomb">Honeycomb</option>
              <option value="gridPattern">Grid Pattern</option>
              <option value="cubes">Cubes</option>
              <option value="darkPattern">Dark Pattern</option>
              <option value="isoCubes">Isometric Cubes</option>
              <option value="trianglePattern">Triangle Pattern</option>
              <option value="trippyCircles">Trippy Circles</option>
              <option value="cubicHoles">Cubic Holes</option>
            </select>
          </div>

          {/* Animation Settings */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Animation Settings</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Animation Speed</label>
              <select 
                value={getSettingValue('animations.speed', 'normal')}
                onChange={(e) => updateNestedSettings(['animations', 'speed'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Animation Type</label>
              <select 
                value={getSettingValue('animations.type', 'smooth')}
                onChange={(e) => updateNestedSettings(['animations', 'type'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="smooth">Smooth</option>
                <option value="bounce">Bounce</option>
                <option value="elastic">Elastic</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Animation Intensity</label>
              <select 
                value={getSettingValue('animations.intensity', 'medium')}
                onChange={(e) => updateNestedSettings(['animations', 'intensity'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Page Transition</label>
              <select 
                value={getSettingValue('animations.pageTransition', 'fade')}
                onChange={(e) => updateNestedSettings(['animations', 'pageTransition'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="scale">Scale</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          {/* Layout Settings */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Layout Settings</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Style</label>
              <select 
                value={getSettingValue('layout.cardStyle', 'grid')}
                onChange={(e) => updateNestedSettings(['layout', 'cardStyle'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="grid">Grid</option>
                <option value="masonry">Masonry</option>
                <option value="list">List</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Spacing</label>
              <select 
                value={getSettingValue('layout.spacing', 'comfortable')}
                onChange={(e) => updateNestedSettings(['layout', 'spacing'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Border Radius</label>
              <select 
                value={getSettingValue('layout.borderRadius', 'medium')}
                onChange={(e) => updateNestedSettings(['layout', 'borderRadius'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="none">None</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Shadow Intensity</label>
              <select 
                value={getSettingValue('layout.shadowIntensity', 'medium')}
                onChange={(e) => updateNestedSettings(['layout', 'shadowIntensity'], e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
              >
                <option value="none">None</option>
                <option value="subtle">Subtle</option>
                <option value="medium">Medium</option>
                <option value="strong">Strong</option>
              </select>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};