import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
    referencia: '',
    acepto: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validación de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validación de teléfono (Chile)
  const validatePhone = (phone) => {
    // Acepta formatos: +569XXXXXXXX, 9XXXXXXXX, con o sin espacios
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
    const regex = /^(\+?56)?9\d{8}$/;
    return regex.test(cleanPhone) || cleanPhone === '';
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validaciones requeridas
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (formData.telefono && !validatePhone(formData.telefono)) {
      newErrors.telefono = 'Por favor ingresa un número de teléfono válido (ej: +56 9 1234 5678)';
    }

    if (!formData.servicio) {
      newErrors.servicio = 'Por favor selecciona un tipo de proyecto';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Por favor describe tu proyecto';
    } else if (formData.mensaje.length < 20) {
      newErrors.mensaje = 'La descripción debe tener al menos 20 caracteres';
    }

    if (!formData.acepto) {
      newErrors.acepto = 'Debes aceptar el tratamiento de datos';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll al primer error
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitMessage(result.message || '¡Gracias por tu mensaje! Te contactaremos en las próximas 24 horas.');
        setFormData({
          nombre: '',
          empresa: '',
          email: '',
          telefono: '',
          servicio: '',
          mensaje: '',
          referencia: '',
          acepto: false
        });
        setErrors({});
      } else {
        setSubmitMessage(result.message || 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o contáctanos directamente a info@subdominio.cl');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className="block text-body-sm font-medium text-black dark:text-white mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 rounded-input text-base`}
            placeholder="Juan Pérez"
          />
          {errors.nombre && (
            <p className="mt-1 text-body-sm text-red-500">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="empresa" className="block text-body-sm font-medium text-black dark:text-white mb-2">
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 rounded-input text-base"
            placeholder="Mi Empresa S.A."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-body-sm font-medium text-black dark:text-white mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 rounded-input text-base`}
            placeholder="juan@empresa.com"
          />
          {errors.email && (
            <p className="mt-1 text-body-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-body-sm font-medium text-black dark:text-white mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.telefono ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 rounded-input text-base`}
            placeholder="+56 9 1234 5678"
          />
          {errors.telefono && (
            <p className="mt-1 text-body-sm text-red-500">{errors.telefono}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="servicio" className="block text-body-sm font-medium text-black dark:text-white mb-2">
            Tipo de proyecto *
          </label>
          <select
            id="servicio"
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.servicio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 rounded-input text-base`}
          >
            <option value="">Selecciona un servicio</option>
            <option value="desarrollo-web">Desarrollo Web</option>
            <option value="ecommerce">E-commerce</option>
            <option value="automatizacion">Automatización de Procesos</option>
            <option value="app-movil">Aplicación Móvil</option>
            <option value="sistema-personalizado">Sistema Personalizado</option>
            <option value="rediseno">Rediseño de Sitio Existente</option>
            <option value="mantenimiento">Mantenimiento y Soporte</option>
            <option value="consultoria">Consultoría Tecnológica</option>
            <option value="otro">Otro</option>
          </select>
          {errors.servicio && (
            <p className="mt-1 text-body-sm text-red-500">{errors.servicio}</p>
          )}
        </div>

        <div>
          <label htmlFor="referencia" className="block text-body-sm font-medium text-black dark:text-white mb-2">
            ¿Cómo nos conociste?
          </label>
          <select
            id="referencia"
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 rounded-input text-base"
          >
            <option value="">Selecciona una opción</option>
            <option value="google">Google</option>
            <option value="redes-sociales">Redes Sociales</option>
            <option value="recomendacion">Recomendación</option>
            <option value="cliente-anterior">Soy cliente anterior</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-body-sm font-medium text-black dark:text-white mb-2">
          Cuéntanos sobre tu proyecto *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows="6"
          className={`w-full px-4 py-3 border ${
            errors.mensaje ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } focus:border-black dark:focus:border-white focus:ring-0 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200 resize-none rounded-input text-base`}
          placeholder="Describe tu proyecto: objetivos, funcionalidades principales, público objetivo, referencias de diseño si tienes, y cualquier detalle que consideres importante..."
        />
        {errors.mensaje && (
          <p className="mt-1 text-body-sm text-red-500">{errors.mensaje}</p>
        )}
        <p className="mt-1 text-2xs text-gray-500 dark:text-gray-400">
          {formData.mensaje.length}/500 caracteres
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-card border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <label htmlFor="acepto" className="text-body-sm font-medium text-black dark:text-white cursor-pointer">
              Consentimiento de datos *
            </label>
            <p className="mt-1 text-body-sm text-gray-600 dark:text-gray-400">
              Acepto el tratamiento de mis datos personales según la{' '}
              <a href="/privacidad" className="underline hover:text-black dark:hover:text-white">
                política de privacidad
              </a>{' '}
              para responder a mi consulta y recibir información relevante.
            </p>
          </div>
          <div className="ml-4">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, acepto: !prev.acepto }));
                if (errors.acepto) {
                  setErrors(prev => ({ ...prev, acepto: '' }));
                }
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 ${
                formData.acepto 
                  ? 'bg-black dark:bg-white' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              role="switch"
              aria-checked={formData.acepto}
              aria-label="Aceptar términos"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform duration-200 ${
                  formData.acepto ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        {errors.acepto && (
          <p className="mt-2 text-body-sm text-red-500">{errors.acepto}</p>
        )}
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-card text-body-sm ${
          submitMessage.includes('error') 
            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
            : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
        }`}>
          {submitMessage}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] rounded-button shadow-button hover:shadow-button-hover text-base"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            'Enviar consulta'
          )}
        </button>
      </div>

      <p className="text-2xs text-center text-gray-500 dark:text-gray-400">
        Al enviar este formulario, confirmas que has leído y aceptas nuestros{' '}
        <a href="/terminos" className="underline hover:text-black dark:hover:text-white">
          términos y condiciones
        </a>.
      </p>
    </form>
  );
};

export default ContactForm;