"use client"

import React from 'react';
import { useSettings } from './SettingsContext';
import { StyleProvider, StyledButton, StyledCard, StyledInput } from './StyleProvider';
import { motion } from 'framer-motion';

export const StyleDemo = () => {
  const { settings } = useSettings();
  
  // Animation variants based on settings
  const getContainerVariants = () => {
    const { animations } = settings;
    
    // Base animation properties
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          staggerChildren: animations?.speed === 'slow' ? 0.3 : 
                          animations?.speed === 'fast' ? 0.1 : 0.2
        }
      }
    };
    
    return baseVariants;
  };
  
  const getItemVariants = () => {
    const { animations } = settings;
    
    // Base item variants
    let itemVariants: any = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
      }
    };
    
    // Adjust based on animation type
    if (animations?.type === 'bounce') {
      itemVariants.visible = {
        ...itemVariants.visible,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 10
        }
      };
    } else if (animations?.type === 'elastic') {
      itemVariants.visible = {
        ...itemVariants.visible,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 15
        }
      };
    }
    
    // Adjust intensity
    if (animations?.intensity === 'high') {
      itemVariants.hidden = { ...itemVariants.hidden, scale: 0.8 };
      itemVariants.visible = { ...itemVariants.visible, scale: 1 };
    } else if (animations?.intensity === 'low') {
      itemVariants.hidden = { ...itemVariants.hidden, y: 10 };
    }
    
    return itemVariants;
  };
  
  const containerVariants = getContainerVariants();
  const itemVariants = getItemVariants();
  
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-4 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-4">Style Demo: {settings.componentStyle || 'default'}</h2>
        
        <StyledCard className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Card Component</h3>
          <p>This is a styled card using the {settings.componentStyle || 'default'} style.</p>
        </StyledCard>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledCard>
          <h3 className="text-lg font-semibold mb-2">Form Elements</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Input Field</label>
              <StyledInput placeholder="Enter text..." />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Button</label>
              <StyledButton className="bg-primary text-primary-foreground hover:bg-primary/90">
                Click Me
              </StyledButton>
            </div>
          </div>
        </StyledCard>
        
        <StyledCard>
          <h3 className="text-lg font-semibold mb-2">Layout Settings</h3>
          <p className="text-sm mb-2">Current settings:</p>
          <ul className="text-sm space-y-1">
            <li>Border Radius: {settings.layout?.borderRadius || 'medium'}</li>
            <li>Shadow: {settings.layout?.shadowIntensity || 'medium'}</li>
            <li>Spacing: {settings.layout?.spacing || 'comfortable'}</li>
            <li>Animation Speed: {settings.animations?.speed || 'normal'}</li>
            <li>Animation Type: {settings.animations?.type || 'smooth'}</li>
          </ul>
        </StyledCard>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StyledCard>
          <h3 className="text-lg font-semibold mb-2">Interactive Elements</h3>
          <div className="flex flex-wrap gap-2">
            <StyledButton className="bg-primary text-primary-foreground">Primary</StyledButton>
            <StyledButton className="bg-secondary text-secondary-foreground">Secondary</StyledButton>
            <StyledButton className="bg-destructive text-destructive-foreground">Danger</StyledButton>
            <StyledButton className="bg-muted text-muted-foreground">Muted</StyledButton>
          </div>
        </StyledCard>
      </motion.div>
    </motion.div>
  );
};