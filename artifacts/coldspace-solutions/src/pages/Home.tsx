import { motion } from "framer-motion";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, ThumbsUp, ArrowRight, PhoneCall, Snowflake, Thermometer, Wrench } from "lucide-react";
import { useGetContent } from "@workspace/api-client-react";

export default function Home() {
  const { t } = useI18n();
  const { data: content } = useGetContent();

  const getDynamicContent = (key: string, fallback: string) => {
    const dbItem = content?.find(c => c.key === key);
    return dbItem && dbItem.value ? dbItem.value : fallback;
  };

  const heroTitle = getDynamicContent("hero_title", t('hero.title'));
  const heroSubtitle = getDynamicContent("hero_subtitle", t('hero.subtitle'));
  const aboutText = getDynamicContent("about_text", t('about.desc'));
  const heroBgImage = getDynamicContent("hero_bg_image", `${import.meta.env.BASE_URL}images/hero-hvac.png`);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="HVAC Unit"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            className="max-w-2xl text-white"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/50 text-white font-medium text-sm mb-6 backdrop-blur-sm">
              <Zap size={16} className="text-accent" />
              {t('hero.badge')}
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-white whitespace-pre-line">
              {heroTitle}
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-medium whitespace-pre-line">
              {heroSubtitle}
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto text-lg">
                  {t('btn.quote')}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <a href="tel:+12097615932">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <PhoneCall className="mr-2" size={20} />
                  209-761-5932
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-8 border-b border-border shadow-sm relative z-20 -mt-10 mx-4 sm:mx-8 lg:mx-auto max-w-6xl rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <span className="font-semibold text-lg text-foreground">{t('trust.licensed')}</span>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <Zap size={24} />
            </div>
            <span className="font-semibold text-lg text-foreground">{t('trust.fast')}</span>
          </div>
          <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <ThumbsUp size={24} />
            </div>
            <span className="font-semibold text-lg text-foreground">{t('trust.satisfaction')}</span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-4">{t('services.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* HVAC */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Thermometer size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('services.hvac.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('services.hvac.desc')}</p>
              <Link href="/services" className="inline-flex items-center font-semibold text-secondary hover:text-primary transition-colors">
                {t('btn.learnMore')} <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Refrigeration */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Snowflake size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('services.ref.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('services.ref.desc')}</p>
              <Link href="/services" className="inline-flex items-center font-semibold text-secondary hover:text-primary transition-colors">
                {t('btn.learnMore')} <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Maintenance */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Wrench size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('services.maint.title')}</h3>
              <p className="text-muted-foreground mb-6">{t('services.maint.desc')}</p>
              <Link href="/services" className="inline-flex items-center font-semibold text-secondary hover:text-primary transition-colors">
                {t('btn.learnMore')} <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/10 rounded-[3rem] transform -rotate-3 z-0"></div>
              <img
                src={`${import.meta.env.BASE_URL}images/tech-team.png`}
                alt="Our Team"
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>

            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                {t('about.badge')}
              </div>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">{t('about.title')}</h2>
              <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">
                {aboutText}
              </p>

              <ul className="space-y-4 mb-10">
                {[t('about.bullet1'), t('about.bullet2'), t('about.bullet3')].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="font-semibold text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/about">
                <Button variant="primary" size="lg">
                  {t('btn.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to upgrade your system?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Get a free estimate today or schedule a service call.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button variant="accent" size="lg" className="w-full sm:w-auto text-lg">
                {t('btn.quote')}
              </Button>
            </Link>
            <a href="https://calendly.com/coldspacesolutions" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg">
                {t('btn.schedule')}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
