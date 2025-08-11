import { 
  Check, 
  CheckCircle, 
  Code, 
  LifeBuoy, 
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';

// Re-export common icons for easy use throughout the app
export {
  Check,
  CheckCircle,
  Code,
  LifeBuoy,
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter
};

// Custom icon component for check marks in lists
export const CheckIcon = ({ className = "w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" }) => (
  <Check className={className} />
);

// Custom icon component for check circle
export const CheckCircleIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <CheckCircle className={className} />
);

// Custom icon component for code
export const CodeIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <Code className={className} />
);

// Custom icon component for support/life buoy
export const SupportIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <LifeBuoy className={className} />
);