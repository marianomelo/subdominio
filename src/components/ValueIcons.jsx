import { 
  CheckCircle, 
  MessageCircle, 
  Zap, 
  Clock, 
  Users, 
  Shield 
} from 'lucide-react';

// Value proposition icons
export const QualityIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <CheckCircle className={className} />
);

export const CommunicationIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <MessageCircle className={className} />
);

export const InnovationIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <Zap className={className} />
);

export const TimeIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <Clock className={className} />
);

export const TeamIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <Users className={className} />
);

export const SecurityIcon = ({ className = "w-8 h-8 text-white dark:text-gray-900" }) => (
  <Shield className={className} />
);