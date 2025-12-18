const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Desarrollo Web', href: '/servicios/web' },
    { name: 'E-commerce', href: '/servicios/ecommerce' },
    { name: 'Automatización', href: '/servicios/automatizacion' },
    { name: 'Software a medida', href: '/servicios/personalizado' },
  ];

  const company = [
    { name: 'Soluciones', href: '/soluciones' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main footer content */}
        <div className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-5">
              <a
                href="/"
                className="inline-block font-display text-xl lg:text-2xl font-medium text-black dark:text-white mb-6"
              >
                subdominio.
              </a>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mb-6">
                Estudio digital especializado en crear experiencias web que conectan marcas con personas.
              </p>
              <p className="font-display text-lg italic text-gray-500 dark:text-gray-500 mb-8">
                Código con propósito.
              </p>
              <a
                href="/contacto"
                className="group inline-flex items-center gap-3 text-black dark:text-white transition-all duration-300"
              >
                <span className="text-sm tracking-wide">Iniciar proyecto</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Links columns */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
                {/* Services */}
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6 block">
                    Servicios
                  </span>
                  <ul className="space-y-3">
                    {services.map((service) => (
                      <li key={service.name}>
                        <a
                          href={service.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm"
                        >
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6 block">
                    Estudio
                  </span>
                  <ul className="space-y-3">
                    {company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6 block">
                    Contacto
                  </span>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:info@subdominio.cl"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm"
                      >
                        info@subdominio.cl
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:800914659"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 text-sm"
                      >
                        800 914 659
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
              <span>© {currentYear} Subdominio</span>
              <span className="hidden sm:inline text-gray-300 dark:text-gray-700">—</span>
              <a href="https://tecnologicachile.cl" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors duration-300">
                Tecnológica Chile
              </a>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
              <a href="/privacidad" className="hover:text-black dark:hover:text-white transition-colors duration-300">
                Privacidad
              </a>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <a href="/terminos" className="hover:text-black dark:hover:text-white transition-colors duration-300">
                Términos
              </a>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <a href="/cookies" className="hover:text-black dark:hover:text-white transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
