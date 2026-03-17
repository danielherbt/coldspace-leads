import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Link } from "wouter";
import { Thermometer, Snowflake, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const { t } = useI18n();

  return (
    <main className="w-full bg-background pb-24">
      {/* Header */}
      <section className="bg-primary pt-24 pb-32 text-center text-white relative">
        <div className="absolute inset-0 opacity-20">
          <img src={`${import.meta.env.BASE_URL}images/hero-hvac.png`} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-primary mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">{t('services.title')}</h1>
          <p className="text-xl text-primary-foreground/80">{t('services.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 space-y-16">
        
        {/* HVAC */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Thermometer size={40} />
              </div>
              <h2 className="text-4xl font-bold">HVAC Services</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you need a brand-new installation or a complex repair, our expert team ensures your environment is perfectly controlled. We service both residential homes and commercial rooftops.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Residential HVAC systems", "Commercial rooftop units", "Heating and cooling repair", "System diagnostics", "Air quality improvements", "Ductwork inspection"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="text-secondary" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                 <Link href="/contact">
                  <Button variant="primary">Request HVAC Service</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
               {/* using stock for variety since we used the other ones */}
               <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80" alt="HVAC Tech" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Refrigeration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border"
        >
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Snowflake size={40} />
              </div>
              <h2 className="text-4xl font-bold">Refrigeration Services</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Downtime costs money. Our commercial refrigeration specialists ensure your coolers, freezers, and ice machines operate at peak efficiency. Fast response times for businesses.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Walk-in coolers", "Freezers", "Upright refrigerators", "Ice machines", "Commercial refrigeration", "Temperature monitoring"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="text-primary" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="secondary">Request Refrigeration Help</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
               <img src={`${import.meta.env.BASE_URL}images/refrigeration.png`} alt="Commercial Refrigeration" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Maintenance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <Wrench size={40} />
              </div>
              <h2 className="text-4xl font-bold">Maintenance Services</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Protect your investment with regular maintenance. Our preventative programs stop small issues from becoming expensive breakdowns and extend the life of your equipment.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Preventive maintenance", "Routine inspections", "Emergency repairs", "Equipment reliability", "Filter replacement", "Coil cleaning"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="text-accent" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="accent">Schedule Maintenance</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
               <img src={`${import.meta.env.BASE_URL}images/maintenance.png`} alt="Maintenance" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
