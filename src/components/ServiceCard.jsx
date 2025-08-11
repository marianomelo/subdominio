import { ArrowRight } from 'lucide-react';

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
    <div className="p-8 rounded-card border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <a href={getServiceUrl(title)}>
            <h3 className="text-h3 font-medium text-black dark:text-white mb-4 transition-colors duration-200">
              {title}
            </h3>
          </a>
          <p className="text-body text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
            {description}
          </p>
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="text-body-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 px-3 py-1 rounded-button"
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
            className="inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 font-medium text-base"
          >
            <span>Ver detalles</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a 
            href="/contacto" 
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-body-sm"
          >
            <span>Solicitar información</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;