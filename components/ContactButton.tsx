import React from 'react';
import { StyledButton } from './StyleProvider';
import { useSettings } from './SettingsContext';

interface ContactButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const ContactButton = ({ onClick, className, children = "Save Contact" }: ContactButtonProps) => {
  const { settings } = useSettings();
  
  return (
    <div className="w-full my-3"> {/* Wrapper to ensure full width */}
      <StyledButton 
        onClick={onClick} 
        className={`w-full !py-4 !text-lg font-semibold !min-h-[50px] ${className}`}
        size="xl" // Use the largest size
      >
        {children}
      </StyledButton>
    </div>
  );
};