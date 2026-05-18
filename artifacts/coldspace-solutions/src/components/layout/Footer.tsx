import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <div className="bg-white p-2 rounded-lg inline-block">
                <img 
                  src={`${import.meta.env.BASE_URL}images/logo.png`} 
                  alt="ColdSpace Solutions Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-sm">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-primary-foreground/80 hover:text-secondary transition-colors">{t('nav.home')}</a></li>
              <li><a href="#services" className="text-primary-foreground/80 hover:text-secondary transition-colors">{t('nav.services')}</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-secondary transition-colors">{t('nav.about')}</a></li>
              <li><a href="#testimonials" className="text-primary-foreground/80 hover:text-secondary transition-colors">{t('nav.testimonials')}</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-1" size={20} />
                <span className="text-primary-foreground/80">Serving Central Valley,<br />California, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <a href="tel:+12097615932" className="text-primary-foreground/80 hover:text-white">209-761-5932</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <a href="mailto:info@coldspacesolutions.com" className="text-primary-foreground/80 hover:text-white">info@coldspacesolutions.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} ColdSpace Solutions. {t('footer.rights')}</p>
          <p>Licensed & Insured HVAC Contractor</p>
        </div>
      </div>
    </footer>
  );
}
