import { Resend } from 'resend';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Configurar CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  try {
    const data = await request.json();
    
    const { nombre, empresa, email, telefono, servicio, mensaje, referencia, tipoTienda, landing } = data;
    
    // Validación básica del lado del servidor
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Todos los campos requeridos deben ser completados.' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Por favor ingresa un email válido.' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    const servicioMap = {
      'desarrollo-web': 'Desarrollo Web',
      'ecommerce': 'E-commerce',
      'automatizacion': 'Automatización de Procesos',
      'app-movil': 'Aplicación Móvil',
      'sistema-personalizado': 'Sistema Personalizado',
      'rediseno': 'Rediseño de Sitio Existente',
      'mantenimiento': 'Mantenimiento y Soporte',
      'consultoria': 'Consultoría Tecnológica',
      'otro': 'Otro'
    };
    
    const referenciaMap = {
      'google': 'Google',
      'redes-sociales': 'Redes Sociales',
      'recomendacion': 'Recomendación',
      'cliente-anterior': 'Cliente anterior',
      'otro': 'Otro'
    };
    
    const landingNames = {
      'woocommerce': 'Landing WooCommerce',
      'shopify': 'Landing Shopify',
      'contacto': 'Página de Contacto',
      'general': 'Sitio Web General'
    };

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Nueva Consulta desde el Sitio Web</h2>
        
        ${landing ? `<div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #2196f3;">
          <p style="margin: 0; color: #1976d2; font-weight: bold;">📍 Origen: ${landingNames[landing] || landing}</p>
        </div>` : ''}
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Información del Contacto</h3>
          <p><strong>Nombre:</strong> ${nombre}</p>
          ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Detalles del Proyecto</h3>
          <p><strong>Tipo de Proyecto:</strong> ${servicioMap[servicio] || servicio}</p>
          ${tipoTienda ? `<p><strong>Tipo de Tienda:</strong> ${tipoTienda}</p>` : ''}
          ${referencia ? `<p><strong>¿Cómo nos conoció?:</strong> ${referenciaMap[referencia] || referencia}</p>` : ''}
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Mensaje</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          Este mensaje fue enviado desde ${landingNames[landing] || 'el formulario de contacto'} de subdominio.cl<br>
          Fecha: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
        </p>
      </div>
    `;
    
    const plainTextContent = `
Nueva Consulta desde el Sitio Web
${landing ? `\n📍 ORIGEN: ${landingNames[landing] || landing}\n` : ''}

INFORMACIÓN DEL CONTACTO
Nombre: ${nombre}
${empresa ? `Empresa: ${empresa}\n` : ''}Email: ${email}
${telefono ? `Teléfono: ${telefono}\n` : ''}

DETALLES DEL PROYECTO
Tipo de Proyecto: ${servicioMap[servicio] || servicio}
${tipoTienda ? `Tipo de Tienda: ${tipoTienda}\n` : ''}${referencia ? `¿Cómo nos conoció?: ${referenciaMap[referencia] || referencia}\n` : ''}

MENSAJE
${mensaje}

---
Este mensaje fue enviado desde ${landingNames[landing] || 'el formulario de contacto'} de subdominio.cl
Fecha: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
    `;
    
    // Inicializar Resend con la API key desde las variables de entorno
    const resend = new Resend(env?.RESEND_API_KEY || 're_4GzYNUb5_MEQ3r7YpPaexZRZGfgJuZ47B');
    
    // Enviar email principal al equipo comercial
    const { data, error } = await resend.emails.send({
      from: 'Subdominio Web <noreply@transactional.erpsync.app>',
      to: ['comercial@tecnologicachile.cl'],
      subject: `Nueva consulta${landing ? ` [${landingNames[landing]}]` : ''}: ${servicioMap[servicio] || servicio} - ${nombre}`,
      html: emailContent,
      text: plainTextContent,
      reply_to: email,
    });
    
    if (error) {
      console.error('Error sending email:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' 
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }
    
    // Email de confirmación automática al usuario
    const autoReplyContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">¡Gracias por contactarnos!</h2>
        
        <p>Hola ${nombre},</p>
        
        <p>Hemos recibido tu consulta sobre <strong>${servicioMap[servicio] || servicio}</strong> y nuestro equipo la está revisando.</p>
        
        <p>Te responderemos en las próximas 24 horas hábiles con información detallada sobre tu proyecto.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Resumen de tu consulta:</h3>
          <p style="line-height: 1.6;">${mensaje}</p>
        </div>
        
        <p>Mientras tanto, te invitamos a:</p>
        <ul>
          <li>Visitar nuestro <a href="https://subdominio.cl/productos">catálogo de productos</a></li>
          <li>Conocer más sobre <a href="https://subdominio.cl/nosotros">nuestro equipo</a></li>
          <li>Ver algunos de <a href="https://subdominio.cl/proyectos">nuestros proyectos realizados</a></li>
        </ul>
        
        <p>Si necesitas comunicarte de manera urgente, puedes llamarnos al <strong>800 914 659</strong>.</p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px;">
          Este es un mensaje automático. Por favor, no respondas a este correo.<br>
          Para contactarnos, utiliza: <a href="mailto:info@subdominio.cl">info@subdominio.cl</a>
        </p>
      </div>
    `;
    
    // Enviar email de confirmación al usuario
    await resend.emails.send({
      from: 'Subdominio <noreply@transactional.erpsync.app>',
      to: [email],
      subject: 'Hemos recibido tu consulta - Subdominio',
      html: autoReplyContent,
      text: `Hola ${nombre},\n\nHemos recibido tu consulta sobre ${servicioMap[servicio] || servicio} y nuestro equipo la está revisando.\n\nTe responderemos en las próximas 24 horas hábiles.\n\nSaludos,\nEquipo Subdominio`,
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '¡Gracias por tu mensaje! Te contactaremos en las próximas 24 horas.' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error al procesar tu solicitud. Por favor, intenta nuevamente.' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
}

// Manejar solicitudes OPTIONS para CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}