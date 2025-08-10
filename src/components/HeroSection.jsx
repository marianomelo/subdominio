const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 md:mb-8 text-black leading-tight md:leading-none tracking-tight animate-fade-up">
            Creamos productos digitales excepcionales
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up px-4 sm:px-0" style={{ animationDelay: '100ms' }}>
            subdominio. es una agencia de desarrollo que transforma ideas en experiencias digitales que funcionan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
            <a
              href="/contacto"
              className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Iniciar proyecto
            </a>
            <a
              href="/proyectos"
              className="px-8 py-4 border border-gray-300 text-gray-900 font-medium hover:border-black hover:text-black transition-colors duration-200"
            >
              Ver nuestro trabajo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;