import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

// Export contact icons for use in Astro pages
export const MailIcon = ({ className = "w-5 h-5 text-gray-600 dark:text-gray-300 dark:text-gray-400 mt-1" }) => (
  <Mail className={className} />
);

export const PhoneIcon = ({ className = "w-5 h-5 text-gray-600 dark:text-gray-300 dark:text-gray-400 mt-1" }) => (
  <Phone className={className} />
);

export const MapIcon = ({ className = "w-5 h-5 text-gray-600 dark:text-gray-300 dark:text-gray-400 mt-1" }) => (
  <MapPin className={className} />
);

export const BackArrowIcon = ({ className = "w-4 h-4 mr-2" }) => (
  <ArrowLeft className={className} />
);