import { useState } from 'react';

const ContactFormBase = ({ 
  fields = {},
  defaultService = '',
  landingSource = '',
  submitButtonText = 'Enviar consulta',
  submitButtonClass = 'w-full px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  showCharCounter = true,
  showConsentToggle = true,
  customValidation = null
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: defaultService,
    mensaje: '',
    referencia: '',
    acepto: false,
    ...fields.defaultValues
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

    // Validaciones básicas
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

    if (!formData.servicio && (!fields.hideServicio)) {
      newErrors.servicio = 'Por favor selecciona un tipo de proyecto';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Por favor describe tu proyecto';
    } else if (formData.mensaje.length < 20) {
      newErrors.mensaje = 'La descripción debe tener al menos 20 caracteres';
    }

    if (showConsentToggle && !formData.acepto) {
      newErrors.acepto = 'Debes aceptar el tratamiento de datos';
    }

    // Validación personalizada si se proporciona
    if (customValidation) {
      const customErrors = customValidation(formData);
      Object.assign(newErrors, customErrors);
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
      const submitData = {
        ...formData,
        ...(landingSource && { landing: landingSource })
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitMessage(result.message || '¡Gracias por tu mensaje! Te contactaremos en las próximas 24 horas.');
        setFormData({
          nombre: '',
          empresa: '',
          email: '',
          telefono: '',
          servicio: defaultService,
          mensaje: '',
          referencia: '',
          acepto: false,
          ...fields.defaultValues
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

  const renderField = (fieldName, fieldConfig) => {
    if (!fieldConfig || fieldConfig.hidden) return null;

    const error = errors[fieldName];
    const value = formData[fieldName] || '';
    const fieldId = fieldConfig.id || fieldName;

    const baseInputClass = `w-full px-4 py-3 border ${
      error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
    } focus:border-black dark:focus:border-white focus:outline-none bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300`;

    const label = (
      <label htmlFor={fieldId} className="block text-sm font-medium text-black dark:text-white mb-2">
        {fieldConfig.label} {fieldConfig.required && <span className="text-gray-400">*</span>}
      </label>
    );

    let input;
    
    switch (fieldConfig.type) {
      case 'textarea':
        input = (
          <textarea
            id={fieldId}
            name={fieldName}
            value={value}
            onChange={handleChange}
            rows={fieldConfig.rows || 6}
            className={`${baseInputClass} resize-none`}
            placeholder={fieldConfig.placeholder}
          />
        );
        break;
      
      case 'select':
        input = (
          <select
            id={fieldId}
            name={fieldName}
            value={value}
            onChange={handleChange}
            className={baseInputClass}
          >
            <option value="">{fieldConfig.placeholder || `Selecciona ${fieldConfig.label.toLowerCase()}`}</option>
            {fieldConfig.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        break;
      
      default:
        input = (
          <input
            type={fieldConfig.type || 'text'}
            id={fieldId}
            name={fieldName}
            value={value}
            onChange={handleChange}
            className={baseInputClass}
            placeholder={fieldConfig.placeholder}
          />
        );
    }

    return (
      <div key={fieldName} className={fieldConfig.containerClass || ''}>
        {label}
        {input}
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {fieldName === 'mensaje' && showCharCounter && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {value.length}/500 caracteres
          </p>
        )}
      </div>
    );
  };

  // Configuración de campos por defecto
  const defaultFields = {
    nombre: {
      label: 'Nombre completo',
      type: 'text',
      required: true,
      placeholder: 'Juan Pérez'
    },
    empresa: {
      label: 'Empresa',
      type: 'text',
      placeholder: 'Mi Empresa S.A.'
    },
    email: {
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'juan@empresa.com'
    },
    telefono: {
      label: 'Teléfono',
      type: 'tel',
      placeholder: '+56 9 1234 5678'
    },
    servicio: {
      label: 'Tipo de proyecto',
      type: 'select',
      required: true,
      placeholder: 'Selecciona un servicio',
      options: [
        { value: 'desarrollo-web', label: 'Desarrollo Web' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'automatizacion', label: 'Automatización de Procesos' },
        { value: 'app-movil', label: 'Aplicación Móvil' },
        { value: 'sistema-personalizado', label: 'Sistema Personalizado' },
        { value: 'rediseno', label: 'Rediseño de Sitio Existente' },
        { value: 'mantenimiento', label: 'Mantenimiento y Soporte' },
        { value: 'consultoria', label: 'Consultoría Tecnológica' },
        { value: 'otro', label: 'Otro' }
      ]
    },
    referencia: {
      label: '¿Cómo nos conociste?',
      type: 'select',
      placeholder: 'Selecciona una opción',
      options: [
        { value: 'google', label: 'Google' },
        { value: 'redes-sociales', label: 'Redes Sociales' },
        { value: 'recomendacion', label: 'Recomendación' },
        { value: 'cliente-anterior', label: 'Soy cliente anterior' },
        { value: 'otro', label: 'Otro' }
      ]
    },
    mensaje: {
      label: 'Cuéntanos sobre tu proyecto',
      type: 'textarea',
      required: true,
      placeholder: 'Describe tu proyecto: objetivos, funcionalidades principales, público objetivo, referencias de diseño si tienes, y cualquier detalle que consideres importante...',
      rows: 6
    }
  };

  // Combinar configuración por defecto con personalizada
  const finalFields = { ...defaultFields, ...fields.config };
  const fieldOrder = fields.order || ['nombre', 'empresa', 'email', 'telefono', 'servicio', 'referencia', 'mensaje'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {fields.layout === 'single' ? (
        // Layout de columna única
        <div className="space-y-6">
          {fieldOrder.map(fieldName => {
            if (fieldName === 'servicio' && fields.hideServicio) return null;
            return renderField(fieldName, finalFields[fieldName]);
          })}
        </div>
      ) : (
        // Layout por defecto con grid
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {renderField('nombre', finalFields.nombre)}
            {renderField('empresa', finalFields.empresa)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {renderField('email', finalFields.email)}
            {renderField('telefono', finalFields.telefono)}
          </div>

          {fields.hideServicio ? (
            <div>
              {renderField('referencia', { ...finalFields.referencia, containerClass: 'w-full' })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {renderField('servicio', finalFields.servicio)}
              {renderField('referencia', finalFields.referencia)}
            </div>
          )}

          {renderField('mensaje', finalFields.mensaje)}
        </>
      )}

      {/* Campos adicionales personalizados */}
      {fields.additionalFields && (
        <div className={fields.additionalFieldsClass || 'space-y-6'}>
          {Object.keys(fields.additionalFields).map(fieldName => 
            renderField(fieldName, fields.additionalFields[fieldName])
          )}
        </div>
      )}

      {/* Consentimiento de datos */}
      {showConsentToggle && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="acepto" className="text-sm font-medium text-black dark:text-white cursor-pointer">
                Consentimiento de datos <span className="text-gray-400">*</span>
              </label>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Acepto el tratamiento de mis datos personales según la{' '}
                <a href="/privacidad" className="underline hover:text-black dark:hover:text-white">
                  política de privacidad
                </a>{' '}
                para responder a mi consulta y recibir información relevante.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, acepto: !prev.acepto }));
                  if (errors.acepto) {
                    setErrors(prev => ({ ...prev, acepto: '' }));
                  }
                }}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 ${
                  formData.acepto 
                    ? 'bg-black dark:bg-white' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={formData.acepto}
                aria-label="Aceptar términos"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-900 transition-transform duration-200 ${
                    formData.acepto ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          {errors.acepto && (
            <p className="mt-3 text-sm text-red-500">{errors.acepto}</p>
          )}
        </div>
      )}

      {/* Mensaje de estado */}
      {submitMessage && (
        <div className={`p-4 text-sm ${
          submitMessage.includes('error') || submitMessage.includes('Error')
            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
            : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
        }`}>
          {submitMessage}
        </div>
      )}

      {/* Botón de envío */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={submitButtonClass}
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
            submitButtonText
          )}
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Al enviar este formulario, confirmas que has leído y aceptas nuestros{' '}
        <a href="/terminos" className="underline hover:text-black dark:hover:text-white">
          términos y condiciones
        </a>.
      </p>
    </form>
  );
};

export default ContactFormBase;