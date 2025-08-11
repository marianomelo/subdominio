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
      y: 30,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 md:mb-8 text-black dark:text-white leading-tight md:leading-none tracking-tight"
            variants={itemVariants}
          >
            Tecnología a tu medida, explicada en tu idioma
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Desarrollamos sitios web, e-commerce y soluciones de automatización que funcionan, se mantienen y crecen contigo.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="/contacto"
              className="px-8 py-4 bg-black dark:bg-gray-200 text-white dark:text-gray-900 font-medium transition-colors duration-200 rounded-button"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              Hablemos de tu proyecto
            </motion.a>
            <motion.a
              href="/proyectos"
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 rounded-button"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
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