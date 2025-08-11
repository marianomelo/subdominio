const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 md:mb-8 text-black dark:text-white leading-tight md:leading-none tracking-tight animate-fade-up">
            Tecnología a tu medida, explicada en tu idioma
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up px-4 sm:px-0" style={{ animationDelay: '100ms' }}>
            Desarrollamos sitios web, e-commerce y soluciones de automatización que funcionan, se mantienen y crecen contigo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
            <a
              href="/contacto"
              className="px-8 py-4 bg-black dark:bg-gray-200 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors duration-200"
            >
              Hablemos de tu proyecto
            </a>
            <a
              href="/proyectos"
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Ver proyectos realizados
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;