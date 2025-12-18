import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import { ChevronDown } from 'lucide-react';

const Header = ({ showThemeToggle = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Verificar posición inicial al montar (evita flash en refresh)
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServicesOpen && !event.target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsServicesOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isServicesOpen, isMenuOpen]);

  const navItems = [
    { label: 'Soluciones', href: '/soluciones' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Blog', href: '/blog' },
  ];

  const services = [
    { label: 'Desarrollo Web', href: '/servicios/web' },
    { label: 'E-commerce', href: '/servicios/ecommerce' },
    { label: 'Automatización', href: '/servicios/automatizacion' },
    { label: 'Software a medida', href: '/servicios/personalizado' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20 lg:h-24'
        }`}>
          {/* Logo - Editorial serif */}
          <a
            href="/"
            className="font-display text-xl lg:text-2xl font-medium tracking-tight text-black dark:text-white transition-all duration-300"
          >
            subdominio.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Services dropdown */}
            <div className="relative services-dropdown">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center gap-1.5 text-sm tracking-wide"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Servicios
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute top-full left-0 mt-4 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden transition-all duration-300 ${
                  isServicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <a
                  href="/servicios"
                  className="block px-6 py-4 text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-b border-gray-100 dark:border-gray-800"
                >
                  Ver todos
                </a>
                {services.map((service) => (
                  <a
                    key={service.label}
                    href={service.href}
                    className="block px-6 py-4 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-sm"
                  >
                    {service.label}
                  </a>
                ))}
              </div>
            </div>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm tracking-wide"
              >
                {item.label}
              </a>
            ))}

            <div className="flex items-center gap-6 ml-4 pl-6 border-l border-gray-200 dark:border-gray-700">
              {showThemeToggle && <ThemeToggle />}

              <a
                href="/contacto"
                className="group inline-flex items-center gap-2 text-sm tracking-wide text-black dark:text-white hover:opacity-70 transition-all duration-300"
              >
                <span>Contacto</span>
                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 menu-toggle"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`block h-px w-full bg-black dark:bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-px w-full bg-black dark:bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-px w-full bg-black dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-white dark:bg-gray-900 transition-all duration-500 mobile-menu ${
            isScrolled ? 'top-16' : 'top-20'
          } ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-6 py-12">
            {/* Services section */}
            <div className="mb-8">
              <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-4 block">
                Servicios
              </span>
              {services.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {service.label}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-gray-800 my-8" />

            {/* Main navigation */}
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}

            {/* Footer actions */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              {showThemeToggle && <ThemeToggle />}
              <a
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 text-black dark:text-white"
              >
                <span>Contacto</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
