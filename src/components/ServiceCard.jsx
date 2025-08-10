const ServiceCard = ({ title, description, technologies = [], price }) => {
  const getServiceUrl = (title) => {
    switch (title) {
      case 'Desarrollo Web':
        return '/servicios/web';
      case 'Desarrollo de E-commerce':
        return '/servicios/ecommerce';
      case 'Automatización de Procesos':
        return '/servicios/automatizacion';
      case 'Desarrollo Personalizado':
        return '/servicios/personalizado';
      default:
        return '/contacto';
    }
  };

  return (
    <div className="py-12 border-b border-gray-200 last:border-b-0 group hover:bg-gray-50 transition-colors duration-200 -mx-6 px-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <a href={getServiceUrl(title)}>
            <h3 className="text-2xl font-medium text-black mb-4 group-hover:text-gray-700 transition-colors duration-200">
              {title}
            </h3>
          </a>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-lg">
            {description}
          </p>
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="text-sm text-gray-500 border border-gray-200 px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:text-right flex-shrink-0 flex flex-col gap-3">
          <a 
            href={getServiceUrl(title)} 
            className="inline-flex items-center text-black hover:text-gray-600 transition-colors duration-200"
          >
            <span className="font-medium">Ver detalles</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a 
            href="/contacto" 
            className="inline-flex items-center text-gray-500 hover:text-black transition-colors duration-200 text-sm"
          >
            <span>Solicitar información</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;