"use client"

import React from 'react';
import { useSettings } from './SettingsContext';
import { cn } from '@/lib/utils';

// Base StyleProvider component
// Update the StyleProviderProps interface
interface StyleProviderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'button' | 'input';
  style?: React.CSSProperties; // Add this line to properly type the style prop
}

export const StyleProvider = ({ 
  children, 
  className, 
  variant = 'card',
  style: initialStyle = {} // Rename the prop to initialStyle
}: StyleProviderProps) => {
  const { settings } = useSettings();
  const profileColor = settings.profileColor || '#3B82F6';
  
  // Only neomorphic and retro styles don't use profile color
  const useProfileColor = settings.componentStyle !== 'neomorphic' && settings.componentStyle !== 'retro';
  
  // Create style object for dynamic colors
  const dynamicStyle: React.CSSProperties = {};
  if (useProfileColor) {
    // Apply profile color to appropriate styles based on component type
    switch (settings.componentStyle) {
      case 'glass':
        dynamicStyle.backgroundColor = `${profileColor}33`; // 20% opacity
        dynamicStyle.borderColor = `${profileColor}4D`;     // 30% opacity
        break;
      case 'minimal':
        dynamicStyle.borderColor = profileColor;
        dynamicStyle.color = profileColor;
        break;
      case 'cyber':
        dynamicStyle.backgroundColor = 'black';
        dynamicStyle.color = profileColor;
        dynamicStyle.borderColor = profileColor;
        break;
      case 'material':
        dynamicStyle.backgroundColor = profileColor;
        dynamicStyle.color = 'white';
        break;
    }
  }
  
  // Merge initial style with dynamic style
  const finalStyle = { ...initialStyle, ...dynamicStyle };
  
  let styleClasses = '';
  
  switch (settings.componentStyle) {
    case 'glass':
      styleClasses = cn(
        'backdrop-blur-md border',
        !useProfileColor && 'bg-white/20 border-white/30',
        variant === 'button' && 'hover:bg-opacity-30 active:bg-opacity-40 transition-all'
      );
      break;
      
    case 'neomorphic':
      styleClasses = cn(
        'bg-gray-100 dark:bg-gray-800 shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.7)]',
        'dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)]',
        variant === 'button' && 'active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.1),inset_-5px_-5px_10px_rgba(255,255,255,0.7)]'
      );
      break;
      
    case 'retro':
      styleClasses = cn(
        'bg-purple-900 text-pink-300 border-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.7),inset_0_0_10px_rgba(255,0,255,0.4)]',
        variant === 'button' && 'hover:text-pink-200 hover:shadow-[0_0_15px_rgba(0,255,255,0.9),inset_0_0_15px_rgba(255,0,255,0.6)]'
      );
      break;
      // Fix the minimal case in StyleProvider
      case 'minimal':
        styleClasses = cn(
          'border',
          !useProfileColor && 'border-gray-300 dark:border-gray-700',
          variant === 'button' && 'hover:bg-opacity-10 transition-colors'
        );
        // Add hover effect with inline style for button
        if (variant === 'button' && useProfileColor) {
          finalStyle.transition = 'all 0.2s'; // Changed from style to finalStyle
        }
        break;
      
      case 'cyber':
        styleClasses = cn(
          'border-2 border-b-4 border-r-4',
          !useProfileColor && 'bg-black text-yellow-400 border-yellow-400',
          'shadow-[0_0_10px_rgba(0,0,0,0.5)]',
          variant === 'button' && 'hover:shadow-[0_0_15px_rgba(0,0,0,0.7)]'
        );
        break;
      
      case 'material':
        styleClasses = cn(
          'shadow-md',
          !useProfileColor && 'bg-blue-500 text-white',
          variant === 'button' && 'hover:shadow-lg active:shadow-sm transition-shadow'
        );
        break;
      
    default: // default style
      styleClasses = cn(
        'bg-background border border-border',
        variant === 'button' && 'hover:bg-muted/50 active:bg-muted transition-colors'
      );
      break;
  }
  
  return (
    <div className={cn(styleClasses, className)} style={finalStyle}>
      {children}
    </div>
  );
};

// StyledCard component
interface StyledCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const StyledCard = ({ children, className, style }: StyledCardProps) => {
  const { settings } = useSettings();
  const borderRadius = settings.layout?.borderRadius || 'medium';
  const shadowIntensity = settings.layout?.shadowIntensity || 'medium';
  const spacing = settings.layout?.spacing || 'comfortable';
  
  // Map settings to actual CSS classes with more aggressive styling
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-xl', // More aggressive rounding
    large: 'rounded-3xl' // Much more aggressive rounding
  };
  
  const shadowClasses = {
    none: 'shadow-none',
    subtle: 'shadow-sm',
    medium: 'shadow-md',
    strong: 'shadow-2xl' // More dramatic shadow
  };
  
  const spacingClasses = {
    compact: 'p-2',
    comfortable: 'p-4',
    spacious: 'p-8' // More spacious padding
  };
  
  return (
    <StyleProvider 
      className={cn(
        radiusClasses[borderRadius],
        shadowClasses[shadowIntensity],
        spacingClasses[spacing],
        'transition-all duration-300', // Smooth transitions
        className
      )}
      variant="card"
      style={style}
    >
      {children}
    </StyleProvider>
  );
};

// StyledButton component
interface StyledButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const StyledButton = ({ 
  children, 
  className, 
  onClick, 
  disabled = false,
  type = 'button',
  size = 'md'
}: StyledButtonProps) => {
  const { settings } = useSettings();
  const borderRadius = settings.layout?.borderRadius || 'medium';
  const shadowIntensity = settings.layout?.shadowIntensity || 'medium';
  
  // Map settings to actual CSS classes with more aggressive styling
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-xl', // More aggressive rounding
    large: 'rounded-full' // Fully rounded for buttons
  };
  
  // Map shadow settings
  const shadowClasses = {
    none: 'shadow-none',
    subtle: 'shadow-sm',
    medium: 'shadow-md',
    strong: 'shadow-2xl' // More dramatic shadow
  };
  
  // Size classes - make these more distinct
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
    xl: 'px-9 py-5 text-xl font-bold min-h-[70px]' // Larger button
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        radiusClasses[borderRadius],
        shadowClasses[shadowIntensity],
        sizeClasses[size],
        'font-medium transition-all w-full transform hover:scale-[1.02] active:scale-[0.98]', // Add subtle scaling effect
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <StyleProvider 
        variant="button" 
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </StyleProvider>
    </button>
  );
};
// StyledInput component
interface StyledInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  disabled?: boolean;
}

export const StyledInput = ({
  placeholder,
  value,
  onChange,
  className,
  type = 'text',
  disabled = false
}: StyledInputProps) => {
  const { settings } = useSettings();
  const borderRadius = settings.layout?.borderRadius || 'medium';
  
  // Map settings to actual CSS classes
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg'
  };
  
  return (
    <div className="relative">
      <StyleProvider 
        variant="input" 
        className={cn(
          'w-full',
          radiusClasses[borderRadius],
          className
        )}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full p-2 bg-transparent outline-none"
        />
      </StyleProvider>
    </div>
  );
};