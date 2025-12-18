import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:opacity-70 transition-opacity duration-300"
      aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;