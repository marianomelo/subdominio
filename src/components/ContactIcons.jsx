// Static SVG icons as React components for use in React components only
import { Mail, Phone, MapPin } from 'lucide-react';

export const MailIcon = ({ className = "w-5 h-5 text-gray-600 dark:text-gray-300 dark:text-gray-400 mt-1" }) => (
  <Mail className={className} />
);

export const PhoneIcon = ({ className = "w-5 h-5 text-gray-600 dark:text-gray-300 dark:text-gray-400 mt-1" }) => (
  <Phone className={className} />
);

export const MapIcon = ({ className = "w-5 h-5 text-gray-600 dark:text-gray-300 dark:text-gray-400 mt-1" }) => (
  <MapPin className={className} />
);