import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Globe, CalendarDays } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/services", label: t('nav.services') },
    { href: "/about", label: t('nav.about') },
    { href: "/testimonials", label: t('nav.testimonials') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <Phone size={16} className="text-secondary" />
              Emergency 24/7: +1 (559) 555-0100
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 hover:text-secondary transition-colors"
            >
              <Globe size={16} />
              {language === 'en' ? 'Español' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-3" 
            : "bg-white py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          <Link href="/" className="flex flex-col">
            <span className="font-display font-extrabold text-2xl tracking-tight text-primary leading-none">
              ColdSpace<span className="text-secondary">.</span>
            </span>
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">
              Solutions
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-secondary",
                  location === link.href ? "text-primary border-b-2 border-accent" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <a href="https://calendly.com/coldspacesolutions" target="_blank" rel="noreferrer">
              <Button variant="accent" size="sm" className="gap-2">
                <CalendarDays size={18} />
                {t('btn.schedule')}
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-foreground/80 font-semibold"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-border flex flex-col p-4 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-4 px-2 font-semibold border-b border-border text-lg",
                  location === link.href ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="https://calendly.com/coldspacesolutions" 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 mb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="accent" className="w-full justify-center gap-2">
                <CalendarDays size={20} />
                {t('btn.schedule')}
              </Button>
            </a>
            <a href="tel:+15595550100" className="mt-2 mb-4">
              <Button variant="outline" className="w-full justify-center gap-2">
                <Phone size={20} />
                +1 (559) 555-0100
              </Button>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
