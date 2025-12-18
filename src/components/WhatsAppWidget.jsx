import { motion } from 'framer-motion';

const WhatsAppWidget = () => {
  const whatsappNumber = '56800914659';
  const defaultMessage = 'Hola! Me gustaría consultar sobre sus servicios.';

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[60]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        className="group flex items-center gap-2 px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium tracking-wide rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Abrir WhatsApp"
      >
        <span>Hablemos</span>
        <svg
          className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppWidget;
