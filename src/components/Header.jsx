import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close services dropdown if clicking outside
      if (isServicesOpen && !event.target.closest('.services-dropdown')) {
        setIsServicesOpen(false);
      }
      // Close mobile menu if clicking outside
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    // Close dropdown when pressing Escape key
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
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Blog', href: '/blog' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ];

  const services = [
    { label: 'Desarrollo Web', href: '/servicios/web' },
    { label: 'Desarrollo de E-commerce', href: '/servicios/ecommerce' },
    { label: 'Automatización de Procesos', href: '/servicios/automatizacion' },
    { label: 'Desarrollo Personalizado', href: '/servicios/personalizado' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-sm border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-bold tracking-tight text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
            subdominio.
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-black font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            <div className="relative services-dropdown">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-gray-600 hover:text-black font-medium transition-colors duration-200 flex items-center py-2"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Servicios
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-50 transition-all duration-200 ${
                  isServicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {services.map((service) => (
                  <a
                    key={service.label}
                    href={service.href}
                    className="block px-6 py-4 text-gray-700 hover:text-black hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 text-sm font-medium"
                  >
                    {service.label}
                  </a>
                ))}
              </div>
            </div>
            
            <a
              href="/contacto"
              className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Hablemos
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 menu-toggle"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </nav>

        <div
          className={`lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 mobile-menu ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-6 py-8">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-4 text-gray-600 hover:text-black font-medium transition-colors duration-200 border-b border-gray-100"
              >
                {item.label}
              </a>
            ))}
            
            <div className="py-4 border-b border-gray-100">
              <div className="text-gray-600 font-medium mb-3">Servicios</div>
              {services.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 pl-4 text-gray-500 hover:text-black transition-colors duration-200"
                >
                  {service.label}
                </a>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full px-6 py-3 bg-black text-white font-medium text-center hover:bg-gray-800 transition-colors duration-200"
              >
                Hablemos
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;