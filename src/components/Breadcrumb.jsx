import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumb component for improved navigation and SEO
 * @param {Object} props
 * @param {Array} props.items - Array of breadcrumb items with { label, href }
 * @param {string} props.className - Additional CSS classes
 */
const Breadcrumb = ({ items = [], className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              
              {isLast ? (
                <span 
                  className="text-gray-900 dark:text-gray-100 font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;