import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  
  // WhatsApp number - Replace with your actual WhatsApp Business number
  const whatsappNumber = '56800914659'; // Chile format without +
  const defaultMessage = 'Hola! Me gustaría consultar sobre sus servicios.';
  
  useEffect(() => {
    // Show tooltip after 5 seconds if widget hasn't been opened
    const timer = setTimeout(() => {
      if (!isOpen && !localStorage.getItem('whatsapp-widget-seen')) {
        setShowTooltip(true);
        // Hide tooltip after 10 seconds
        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem('whatsapp-widget-seen', 'true');
        }, 10000);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = () => {
    const text = message || defaultMessage;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const handleQuickMessage = (quickMessage) => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quickMessage)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const quickMessages = [
    { text: 'Necesito un sitio web', icon: '🌐' },
    { text: 'Consulta sobre e-commerce', icon: '🛒' },
    { text: 'Información sobre precios', icon: '💰' },
    { text: 'Agendar una reunión', icon: '📅' }
  ];

  return (
    <>
      {/* Main Widget Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5 
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                ¿Necesitas ayuda? Chatea con nosotros
                <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-2 h-2 bg-black dark:bg-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center shadow-lg
            transition-all duration-300 hover:scale-110
            ${isOpen 
              ? 'bg-gray-900 dark:bg-gray-100' 
              : 'bg-green-600 hover:bg-green-700'
            }
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir WhatsApp'}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-white" fill="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulse Animation */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-600 pointer-events-none"
            animate={{
              scale: [1, 1.3, 1.3],
              opacity: [0.4, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25 
            }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-5 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" fill="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Subdominio</h3>
                    <p className="text-sm text-green-100 flex items-center">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
                      En línea ahora
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div className="text-center text-gray-600 dark:text-gray-300">
                  <p className="text-sm mb-4">
                    👋 Hola! ¿En qué podemos ayudarte hoy?
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  {quickMessages.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickMessage(item.text)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {item.text}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Message Input */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    O escribe tu mensaje:
                  </p>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Escribe tu consulta..."
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-green-600 dark:focus:border-green-500 transition-colors duration-200"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Enviar mensaje"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                  Responderemos en minutos via WhatsApp
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppWidget;