import ContactFormBase from './ContactFormBase.jsx';

const ContactForm = () => {
  return (
    <ContactFormBase 
      submitButtonText="Enviar consulta"
      showCharCounter={true}
      showConsentToggle={true}
    />
  );
};

export default ContactForm;