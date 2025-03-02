export const generateVCard = (contact: {
  firstName: string;
  lastName?: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  note?: string;
}) => {
  // Start building vCard
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
  
  // Add name
  const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
  vcard += `N:${contact.lastName || ''};${contact.firstName || ''};;;\n`;
  vcard += `FN:${fullName}\n`;
  
  // Add organization if available
  if (contact.organization) {
    vcard += `ORG:${contact.organization}\n`;
  }
  
  // Add title/role if available
  if (contact.title) {
    vcard += `TITLE:${contact.title}\n`;
  }
  
  // Add phone if available - format for both iOS and Android
  if (contact.phone) {
    // Remove any non-digit characters for compatibility
    const cleanPhone = contact.phone.replace(/\D/g, '');
    vcard += `TEL;type=CELL:${cleanPhone}\n`;
  }
  
  // Add email if available
  if (contact.email) {
    vcard += `EMAIL;type=INTERNET:${contact.email}\n`;
  }
  
  // Add website if available
  if (contact.website) {
    vcard += `URL:${contact.website}\n`;
  }
  
  // Add address if available
  if (contact.address) {
    vcard += `ADR:;;${contact.address};;;;\n`;
  }
  
  // Add note if available
  if (contact.note) {
    vcard += `NOTE:${contact.note}\n`;
  }
  
  // End vCard
  vcard += 'END:VCARD';
  
  return vcard;
};

export const downloadVCard = (contact: any) => {
  const vcard = generateVCard(contact);
  
  // Create a Blob with the vCard data
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  
  // Create a link element and trigger download
  const a = document.createElement('a');
  const fileName = `${contact.firstName || 'contact'}_${contact.lastName || ''}.vcf`.replace(/\s+/g, '_');
  
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};