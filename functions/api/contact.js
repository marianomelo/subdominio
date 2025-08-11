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
    
    const { nombre, empresa, email, telefono, servicio, mensaje, referencia } = data;
    
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
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Nueva Consulta desde el Sitio Web</h2>
        
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
          ${referencia ? `<p><strong>¿Cómo nos conoció?:</strong> ${referenciaMap[referencia] || referencia}</p>` : ''}
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #555; margin-top: 0;">Mensaje</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          Este mensaje fue enviado desde el formulario de contacto de subdominio.cl<br>
          Fecha: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
        </p>
      </div>
    `;
    
    const plainTextContent = `
Nueva Consulta desde el Sitio Web

INFORMACIÓN DEL CONTACTO
Nombre: ${nombre}
${empresa ? `Empresa: ${empresa}\n` : ''}Email: ${email}
${telefono ? `Teléfono: ${telefono}\n` : ''}

DETALLES DEL PROYECTO
Tipo de Proyecto: ${servicioMap[servicio] || servicio}
${referencia ? `¿Cómo nos conoció?: ${referenciaMap[referencia] || referencia}\n` : ''}

MENSAJE
${mensaje}

---
Este mensaje fue enviado desde el formulario de contacto de subdominio.cl
Fecha: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}
    `;
    
    // Usar la API key de Resend directamente o desde variables de entorno de Cloudflare
    const RESEND_API_KEY = env?.RESEND_API_KEY || 're_4GzYNUb5_MEQ3r7YpPaexZRZGfgJuZ47B';
    
    // Enviar email principal al equipo comercial
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Subdominio Web <noreply@transactional.erpsync.app>',
        to: ['comercial@tecnologicachile.cl'],
        subject: `Nueva consulta: ${servicio} - ${nombre}`,
        html: emailContent,
        text: plainTextContent,
        reply_to: email,
      }),
    });
    
    if (!emailResponse.ok) {
      const error = await emailResponse.text();
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
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Subdominio <noreply@transactional.erpsync.app>',
        to: [email],
        subject: 'Hemos recibido tu consulta - Subdominio',
        html: autoReplyContent,
        text: `Hola ${nombre},\n\nHemos recibido tu consulta sobre ${servicioMap[servicio] || servicio} y nuestro equipo la está revisando.\n\nTe responderemos en las próximas 24 horas hábiles.\n\nSaludos,\nEquipo Subdominio`,
      }),
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