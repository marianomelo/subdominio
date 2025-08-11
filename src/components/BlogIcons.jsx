import { ArrowLeft, User, ArrowRight } from 'lucide-react';

export const BlogBackIcon = ({ className = "w-4 h-4 mr-2" }) => (
  <ArrowLeft className={className} />
);

export const AuthorIcon = ({ className = "w-6 h-6 text-gray-600 dark:text-gray-300" }) => (
  <User className={className} />
);

export const ReadMoreIcon = ({ className = "w-4 h-4 ml-2" }) => (
  <ArrowRight className={className} />
);