import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

type Dictionary = Record<string, string>;
type Translations = Record<Language, Dictionary>;

const translations: Translations = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    
    // Buttons
    'btn.quote': 'Get a Free Quote',
    'btn.call': 'Call Now',
    'btn.schedule': 'Schedule Service',
    'btn.submit': 'Send Message',
    'btn.submitting': 'Sending...',
    'btn.learnMore': 'Learn More',

    // Hero
    'hero.badge': '24/7 Emergency Service in Central Valley',
    'hero.title': 'Expert HVAC & Refrigeration Solutions',
    'hero.subtitle': 'Reliable, professional, and efficient climate control and refrigeration services for residential and commercial needs across the Central Valley.',
    
    // Trust
    'trust.licensed': 'Licensed & Insured',
    'trust.fast': 'Fast Response',
    'trust.satisfaction': '100% Satisfaction',
    
    // Services Preview
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive climate solutions tailored to your needs',
    'services.hvac.title': 'HVAC Systems',
    'services.hvac.desc': 'Installation, repair, and maintenance for residential and commercial heating and cooling.',
    'services.ref.title': 'Commercial Refrigeration',
    'services.ref.desc': 'Expert service for walk-in coolers, freezers, and ice machines.',
    'services.maint.title': 'Preventive Maintenance',
    'services.maint.desc': 'Routine inspections to ensure equipment reliability and longevity.',

    // About Preview
    'about.badge': 'Why Choose Us',
    'about.title': 'Your Trusted Local Experts',
    'about.desc': 'ColdSpace Solutions has been serving the Central Valley with unparalleled dedication. We understand that your comfort and business operations depend on reliable systems.',
    'about.bullet1': 'Over 15 Years of Experience',
    'about.bullet2': 'Certified & Trained Technicians',
    'about.bullet3': 'Transparent Pricing, No Hidden Fees',

    // Contact Form
    'contact.title': 'Contact Us Today',
    'contact.subtitle': 'Fill out the form below or call us directly. We respond promptly.',
    'form.name': 'Full Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.service': 'Service Required',
    'form.message': 'How can we help?',
    'form.service.hvac': 'HVAC Service',
    'form.service.refrigeration': 'Refrigeration',
    'form.service.maintenance': 'Maintenance',
    'form.service.emergency': 'Emergency Repair',
    'form.service.other': 'Other',

    // Testimonials
    'test.title': 'What Our Customers Say',
    'test.subtitle': 'Don\'t just take our word for it.',

    // Footer
    'footer.about': 'Providing top-tier HVAC and commercial refrigeration services to the Central Valley, California. Comfort and reliability you can trust.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',

    // Buttons
    'btn.quote': 'Presupuesto Gratis',
    'btn.call': 'Llama Ahora',
    'btn.schedule': 'Agendar Servicio',
    'btn.submit': 'Enviar Mensaje',
    'btn.submitting': 'Enviando...',
    'btn.learnMore': 'Saber Más',

    // Hero
    'hero.badge': 'Servicio de Emergencia 24/7 en Central Valley',
    'hero.title': 'Soluciones Expertas en HVAC y Refrigeración',
    'hero.subtitle': 'Servicios de control de clima y refrigeración confiables, profesionales y eficientes para necesidades residenciales y comerciales en Central Valley.',
    
    // Trust
    'trust.licensed': 'Licencia y Seguro',
    'trust.fast': 'Respuesta Rápida',
    'trust.satisfaction': 'Satisfacción 100%',

    // Services Preview
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones integrales de clima adaptadas a sus necesidades',
    'services.hvac.title': 'Sistemas HVAC',
    'services.hvac.desc': 'Instalación, reparación y mantenimiento de calefacción y refrigeración residencial y comercial.',
    'services.ref.title': 'Refrigeración Comercial',
    'services.ref.desc': 'Servicio experto para cámaras frigoríficas, congeladores y máquinas de hielo.',
    'services.maint.title': 'Mantenimiento Preventivo',
    'services.maint.desc': 'Inspecciones de rutina para asegurar la confiabilidad y longevidad del equipo.',

    // About Preview
    'about.badge': 'Por Qué Elegirnos',
    'about.title': 'Sus Expertos Locales de Confianza',
    'about.desc': 'ColdSpace Solutions ha estado sirviendo a Central Valley con una dedicación sin igual. Entendemos que su comodidad y operaciones comerciales dependen de sistemas confiables.',
    'about.bullet1': 'Más de 15 Años de Experiencia',
    'about.bullet2': 'Técnicos Certificados y Capacitados',
    'about.bullet3': 'Precios Transparentes, Sin Cargos Ocultos',

    // Contact Form
    'contact.title': 'Contáctenos Hoy',
    'contact.subtitle': 'Complete el formulario a continuación o llámenos directamente. Respondemos a la brevedad.',
    'form.name': 'Nombre Completo',
    'form.email': 'Correo Electrónico',
    'form.phone': 'Número de Teléfono',
    'form.service': 'Servicio Requerido',
    'form.message': '¿Cómo podemos ayudarle?',
    'form.service.hvac': 'Servicio HVAC',
    'form.service.refrigeration': 'Refrigeración',
    'form.service.maintenance': 'Mantenimiento',
    'form.service.emergency': 'Reparación de Emergencia',
    'form.service.other': 'Otro',

    // Testimonials
    'test.title': 'Lo Que Dicen Nuestros Clientes',
    'test.subtitle': 'No confíe solo en nuestra palabra.',

    // Footer
    'footer.about': 'Proporcionando servicios de HVAC y refrigeración comercial de primer nivel en Central Valley, California. Comodidad y confiabilidad en la que puede confiar.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactInfo': 'Información de Contacto',
    'footer.rights': 'Todos los derechos reservados.',
  }
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
