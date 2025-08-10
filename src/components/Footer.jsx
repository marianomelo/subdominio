import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Desarrollo Web', href: '/servicios/web' },
    { name: 'Desarrollo de E-commerce', href: '/servicios/ecommerce' },
    { name: 'Automatización de Procesos', href: '/servicios/automatizacion' },
    { name: 'Desarrollo Personalizado', href: '/servicios/personalizado' },
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
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    { 
      name: '+56 2 1234 5678', 
      href: 'tel:+56212345678',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    },
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/subdominio',
      icon: 'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z'
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/subdominio',
      icon: 'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/subdominio',
      icon: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'
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
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <a href="/" className="inline-block text-2xl font-bold text-black mb-4 hover:text-gray-800 transition-colors duration-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
              subdominio.
            </a>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Línea de negocio de Tecnológica Chile especializada en desarrollo web y software.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-black mb-4">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-black mb-4">Empresa</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-black mb-4">Contacto</h3>
            <ul className="space-y-3">
              {contact.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors duration-200 flex items-center group"
                  >
                    <svg className="w-5 h-5 mr-2 text-gray-400 group-hover:text-black transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="mb-8">
            <div className="max-w-md mx-auto md:mx-0">
              <h3 className="font-medium text-black mb-4">Suscríbete a nuestro newsletter</h3>
              <p className="text-gray-600 mb-4 text-sm">Recibe las últimas novedades sobre desarrollo web y tecnología.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Suscribirse'}
                </button>
              </form>
              {message && (
                <p className="mt-2 text-sm text-green-600">{message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-600 text-sm">
                © {currentYear} Subdominio - Tecnológica Chile. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-black transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
              
              <div className="flex space-x-4 border-l border-gray-300 pl-6">
                <a
                  href="/privacidad"
                  className="text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                >
                  Privacidad
                </a>
                <a
                  href="/terminos"
                  className="text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                >
                  Términos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;