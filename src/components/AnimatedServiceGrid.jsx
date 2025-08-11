import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedServiceGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      number: '01',
      title: 'Desarrollo Web',
      description: 'Sitios web modernos que cargan rápido, se ven increíbles y convierten visitantes en clientes.',
      href: '/servicios/web',
      tags: ['WordPress', 'React', 'Next.js', 'Astro']
    },
    {
      number: '02',
      title: 'E-commerce',
      description: 'Tiendas online que procesan pagos seguros, gestionan inventarios y escalan con tu negocio.',
      href: '/servicios/ecommerce',
      tags: ['WooCommerce', 'Shopify', 'Laravel']
    },
    {
      number: '03',
      title: 'Automatización',
      description: 'Procesos inteligentes que eliminan tareas repetitivas y te ahorran tiempo valioso.',
      href: '/servicios/automatizacion',
      tags: ['Python', 'APIs', 'IA', 'Workflows']
    },
    {
      number: '04',
      title: 'Software a Medida',
      description: 'Aplicaciones y sistemas personalizados que resuelven exactamente tu problema específico.',
      href: '/servicios/personalizado',
      tags: ['Laravel', 'React Native', 'Node.js']
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-black dark:text-white">
            Soluciones digitales completas para tu negocio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Elige el servicio que mejor se adapte a tus necesidades
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.a 
              key={service.title}
              href={service.href} 
              className="group"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.div 
                className="h-full bg-gray-50 dark:bg-gray-800 p-8 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white"
                whileHover={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xl font-mono rounded-icon"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {service.number}
                  </motion.div>
                  <motion.svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </div>
                <h3 className="text-2xl font-medium text-black dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <motion.span 
                      key={tag}
                      className="text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 px-2 py-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ¿No estás seguro de qué servicio necesitas?
          </p>
          <motion.a 
            href="/contacto"
            className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 rounded-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cuéntanos tu idea
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedServiceGrid;