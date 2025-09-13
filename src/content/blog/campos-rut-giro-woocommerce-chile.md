---
title: "Campos RUT y Facturación WooCommerce Chile: Guía Completa"
excerpt: "Tutorial WooCommerce Chile: implementar campos RUT y facturación SII. Guía paso a paso para tiendas online chilenas con facturación electrónica automática."
publishedDate: "2025-01-15"
category: E-commerce
categoryColor: green
author: Equipo Subdominio
readingTime: 8
featured: true
slug: campos-rut-giro-woocommerce-chile
---

**Equipo Subdominio**  
E-commerce & Desarrollo WordPress  
Artículo verificado • **Enero 2025**

---

En Chile, al vender productos o servicios a través de internet, es habitual que los clientes —especialmente empresas— soliciten factura electrónica en lugar de boleta. Para poder emitir facturas, es obligatorio contar con ciertos datos tributarios del comprador, como el RUT, el Giro (razón social) y el tipo de documento que requiere (boleta o factura).

El problema es que WooCommerce, por defecto, no incluye estos campos en el proceso de compra. Si no se agregan manualmente, el pedido llega incompleto y es imposible emitir el documento tributario electrónico (DTE) de forma automática o integrarlo correctamente a tu sistema contable. Si estás evaluando [qué es WooCommerce para tu PYME](/blog/que-es-woocommerce-pyme), estos campos son fundamentales para operar legalmente en Chile.

En este artículo te mostraremos cómo añadir los campos RUT, Giro y Tipo de Documento en WooCommerce, ya sea usando plugins o mediante implementación personalizada con código.

## **Por qué es importante añadir estos campos**

### **Cumplimiento tributario**
El Servicio de Impuestos Internos (SII) exige que toda factura incluya RUT y giro del cliente.

### **Automatización**
Los sistemas de emisión de DTE necesitan estos datos para generar documentos automáticamente.

### **Evitar errores**
Si faltan estos campos, deberás contactar manualmente a cada cliente para solicitar sus datos.

### **Mejor experiencia de compra B2B**
Las empresas esperan que la factura se genere de inmediato con los datos correctos.

## **Campos que se deben incluir**

### **RUT del comprador**
* Validación chilena (formato 12.345.678-5)
* Debe guardarse en el pedido, visible en el panel de administración y en los correos

### **Giro o razón social**
* Campo de texto obligatorio solo si el cliente solicita factura
* No es necesario para boletas electrónicas de consumidores finales

### **Tipo de documento**
* Selector (boleta o factura)
* Permite que el sistema sepa qué tipo de DTE emitir

## **Opción 1: Usar un plugin genérico de campos personalizados**

Si quieres más control sin tener que programar, puedes utilizar plugins genéricos que permiten añadir campos personalizados al checkout de WooCommerce. Algunos ejemplos populares son:

* **Checkout Field Editor for WooCommerce** (ThemeHigh)
* **Flexible Checkout Fields** (WP Desk)
* **WooCommerce Custom Fields**

Con estos plugins puedes crear manualmente los campos RUT, Giro y Tipo de Documento, definir si son obligatorios o condicionales (por ejemplo, mostrar "Giro" solo si se elige "Factura"), y almacenar la información en el pedido.

### **Ventajas**
* No requiere saber programar
* Alta flexibilidad y personalización
* Puedes modificar el checkout sin alterar el código fuente

### **Desventajas**
* No incluyen validación de RUT por defecto (se puede añadir con código o extensiones)
* No generan boletas ni facturas, solo recogen la información

## **Opción 2: Implementar los campos con código personalizado**

Si cuentas con un desarrollador o una agencia que gestione tu sitio, puedes añadir los campos manualmente con hooks de WooCommerce. Esto ofrece control absoluto sobre el flujo y la integración con tu sistema contable.

### **Ejemplo básico en functions.php**

```php
add_action('woocommerce_after_checkout_billing_form', 'campos_chile_checkout');
function campos_chile_checkout($checkout) {

    woocommerce_form_field('rut', array(
        'type' => 'text',
        'class' => array('form-row-wide'),
        'label' => 'RUT',
        'required' => true,
    ), $checkout->get_value('rut'));

    woocommerce_form_field('giro', array(
        'type' => 'text',
        'class' => array('form-row-wide'),
        'label' => 'Giro / Razón Social',
        'required' => false,
    ), $checkout->get_value('giro'));

    woocommerce_form_field('tipo_documento', array(
        'type' => 'select',
        'class' => array('form-row-wide'),
        'label' => 'Tipo de Documento',
        'required' => true,
        'options' => array(
            '' => 'Seleccione…',
            'boleta' => 'Boleta Electrónica',
            'factura' => 'Factura Electrónica'
        )
    ), $checkout->get_value('tipo_documento'));

}
```

### **También deberás**
* Guardar los datos en el pedido (`woocommerce_checkout_update_order_meta`)
* Mostrar los datos en el panel de administración
* Incluirlos en los correos y exportaciones

### **Ventajas**
* Control total sobre el diseño, validación y flujo
* Se pueden aplicar reglas avanzadas (ej. campos condicionales)
* Preparado para integraciones con ERP o facturación automática

### **Desventajas**
* Requiere conocimientos técnicos (PHP)
* Necesita mantenimiento con cada actualización de WooCommerce

## **Buenas prácticas al implementar estos campos**

1. **Validar el formato del RUT** para evitar errores de emisión de facturas
2. **Mostrar el campo "Giro" solo si el cliente selecciona "Factura"**, para simplificar el proceso de compra
3. **Asegurar que los datos queden guardados en el pedido** y accesibles para tu ERP o sistema contable
4. **Probar todo el flujo de compra** con ambos tipos de documento antes de lanzar la tienda
5. **Documentar internamente** cómo se exportan esos datos para contabilidad

## **Integración con sistemas de facturación electrónica**

Una vez que tienes los campos configurados, puedes integrar WooCommerce con servicios de facturación electrónica chilenos como:

* **LibreDTE**
* **Lioren**
* **Haulmer/OpenFactura**
* **Facto**

Estos servicios pueden recibir automáticamente los datos del pedido y generar el DTE correspondiente, enviándolo por email al cliente y registrándolo en el SII.

## **Consideraciones técnicas importantes**

### **Validación del RUT**
Implementa validación JavaScript en tiempo real para verificar que el RUT ingresado sea válido según el algoritmo chileno.

### **Campos condicionales**
Usa JavaScript para mostrar/ocultar el campo "Giro" según la selección del tipo de documento.

### **Almacenamiento de datos**
Asegúrate de que los campos se guarden correctamente en los metadatos del pedido y sean accesibles desde el admin de WooCommerce.

## **Conclusión**

Añadir los campos RUT, Giro y Tipo de Documento en WooCommerce es un paso fundamental para cumplir con la normativa chilena, automatizar la emisión de documentos tributarios y mejorar la experiencia de compra de tus clientes empresariales.

Existen dos caminos principales: usar un plugin genérico para personalizar el checkout o implementar la solución con código. La elección dependerá de tu presupuesto, tu equipo técnico y el grado de personalización que necesites.

En **Subdominio** ayudamos a empresas chilenas a implementar tiendas online adaptadas a los requisitos del Servicio de Impuestos Internos (SII), integradas con sus sistemas de facturación y listas para vender de forma legal y automatizada desde el primer día. Contáctanos para una consultoría gratuita y descubre cómo podemos optimizar tu e-commerce para el mercado chileno.