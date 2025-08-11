import { useState } from 'react';
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
      name: 'info@subdominio.com', 
      href: 'mailto:info@subdominio.com',
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

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setMessage('¡Gracias por suscribirte!');
      setEmail('');
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="/" className="inline-block text-2xl font-bold text-black dark:text-white mb-6 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
              subdominio.
            </a>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mb-6">
              División especializada de Tecnológica Chile en desarrollo web y soluciones digitales que impulsan negocios.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 hover:scale-110"
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
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 inline-block"
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
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 inline-block"
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
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <item.Icon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white mb-2">Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Recibe tips de desarrollo y novedades tech directo en tu inbox.</p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-200 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 text-sm"
                >
                  {isSubmitting ? '...' : 'Suscribir'}
                </button>
              </form>
              {message && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">{message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © {currentYear} Subdominio
              </p>
              <div className="flex items-center gap-6 text-xs">
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