import { motion } from 'framer-motion';

const AnimatedHeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.6
      }
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <motion.div
          className="max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Editorial label */}
          <motion.div
            className="flex items-center gap-4 mb-8 lg:mb-12"
            variants={itemVariants}
          >
            <span className="text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium">
              Estudio Digital
            </span>
            <motion.div
              className="h-px w-12 bg-gray-300 dark:bg-gray-600 origin-left"
              variants={lineVariants}
            />
          </motion.div>

          {/* Main headline - editorial serif */}
          <motion.h1
            className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-black dark:text-white leading-[1.05] tracking-tight mb-8 lg:mb-12"
            variants={itemVariants}
          >
            Diseñamos experiencias
            <br />
            <span className="italic font-normal">digitales con propósito</span>
          </motion.h1>

          {/* Subtext - elegant prose */}
          <motion.div
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16"
            variants={itemVariants}
          >
            <div className="lg:col-start-2">
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Somos la división digital de Tecnológica Chile, especializada en
                transformar ideas complejas en soluciones web elegantes y funcionales. Cada proyecto es una oportunidad
                para crear algo excepcional.
              </p>
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8"
            variants={itemVariants}
          >
            <motion.a
              href="/contacto"
              className="group inline-flex items-center gap-3 text-black dark:text-white"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-base font-medium tracking-wide">Iniciar conversación</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            <span className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600" />

            <motion.a
              href="/proyectos"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            >
              Ver portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Editorial decorative element */}
      <motion.div
        className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 rotate-90 origin-center whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHeroSection;
