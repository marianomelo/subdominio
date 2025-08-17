import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Desarrollo Web', href: '/servicios/web' },
    { name: 'E-commerce', href: '/servicios/ecommerce' },
    { name: 'Automatización', href: '/servicios/automatizacion' },
    { name: 'Apps & Software', href: '/servicios/personalizado' },
  ];

  const company = [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const contact = [
    { 
      name: 'info@subdominio.cl', 
      href: 'mailto:info@subdominio.cl',
      Icon: Mail
    },
    { 
      name: '800 914 659', 
      href: 'tel:800914659',
      Icon: Phone
    },
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/subdominio',
      Icon: Linkedin
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/subdominio',
      Icon: Github
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/subdominio',
      Icon: Twitter
    },
  ];


  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="/" className="inline-block text-2xl font-bold text-black dark:text-white mb-6 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 font-display">
              subdominio.
            </a>
            <p className="text-body text-gray-600 dark:text-gray-300 max-w-sm mb-6">
              División especializada de Tecnológica Chile en desarrollo web y soluciones digitales que impulsan negocios.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 hover:scale-110 rounded-icon"
                  aria-label={social.name}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-6 uppercase tracking-wide">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-body-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 inline-block"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-6 uppercase tracking-wide">Empresa</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-body-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-6 uppercase tracking-wide">Contacto</h3>
            <ul className="space-y-3">
              {contact.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-body-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <item.Icon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © {currentYear} Subdominio
              </p>
              <div className="flex items-center gap-4 sm:gap-6 text-xs">
                <a
                  href="/privacidad"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Privacidad
                </a>
                <a
                  href="/terminos"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Términos
                </a>
                <a
                  href="/cookies"
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Cookies
                </a>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Una división de <a href="https://tecnologicachile.cl" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-black dark:hover:text-white transition-colors duration-200">Tecnológica Chile</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;