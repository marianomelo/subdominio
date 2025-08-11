import * as Icons from 'lucide-react';

const LucideIcon = ({ name, className = "", size = 24, ...props }) => {
  // Convert kebab-case to PascalCase for lucide-react icon names
  const iconName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const Icon = Icons[iconName];
  
  if (!Icon) {
    console.warn(`Icon "${name}" (${iconName}) not found in lucide-react`);
    return null;
  }
  
  return <Icon className={className} size={size} {...props} />;
};

export default LucideIcon;