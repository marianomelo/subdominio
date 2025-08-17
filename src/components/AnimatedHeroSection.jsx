import { motion } from 'framer-motion';

const AnimatedHeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-section-lg">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 sm:mb-8 text-black dark:text-white leading-tight"
            variants={itemVariants}
          >
            Soluciones digitales hechas para tu negocio
          </motion.h1>
          
          <motion.p 
            className="text-body-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Desarrollamos sitios web, e-commerce y automatizaciones que impulsan tu crecimiento y se adaptan a tu futuro.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="/contacto"
              className="px-8 py-3 bg-black dark:bg-gray-200 text-white dark:text-gray-900 font-medium transition-all duration-200 rounded-button shadow-button hover:shadow-button-hover text-base"
            >
              Hablemos de tu proyecto
            </motion.a>
            <motion.a
              href="/proyectos"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200 rounded-button text-base"
            >
              Ver proyectos realizados
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;