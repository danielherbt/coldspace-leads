import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, CalendarDays } from "lucide-react";
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional(),
  service: z.enum(["hvac", "refrigeration", "maintenance", "emergency", "other"]),
  message: z.string().min(10, "Message is too short").max(1000),
  language: z.enum(["en", "es"]).default("en"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "hvac" as const,
      message: "",
      language: language as "en" | "es",
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: language === 'en' ? "Message Sent!" : "¡Mensaje Enviado!",
            description: language === 'en'
              ? "We've received your inquiry and will contact you shortly."
              : "Hemos recibido su consulta y nos comunicaremos en breve.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: language === 'en' ? "Failed to send message. Please try calling us." : "Error al enviar. Por favor llámenos.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <main className="w-full bg-background pb-24">
      {/* Header */}
      <section className="bg-primary pt-24 pb-32 text-center text-white relative">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">{t('contact.title')}</h1>
          <p className="text-xl text-primary-foreground/80">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-border h-full">
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Phone</h4>
                    <p className="text-muted-foreground mt-1">24/7 Emergency Service</p>
                    <a href="tel:+12097615932" className="text-lg font-semibold text-secondary hover:text-primary transition-colors block mt-1">209-761-5932</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground mt-1">Drop us a line</p>
                    <a href="mailto:info@coldspacesolutions.com" className="font-medium text-foreground hover:text-primary transition-colors block mt-1">info@coldspacesolutions.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Service Area</h4>
                    <p className="text-muted-foreground mt-1">Central Valley, California</p>
                    <p className="font-medium text-foreground mt-1">Fresno, Bakersfield, Visalia, Modesto</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-bold text-foreground mb-4">Book Online Instantly</h4>
                  <a href="https://calendly.com/coldspacesolutions" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                      <CalendarDays size={20} />
                      {t('btn.schedule')}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-border">
            <h3 className="text-3xl font-bold mb-8">Send a Message</h3>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">{t('form.name')} *</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">{t('form.email')} *</label>
                  <input
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">{t('form.phone')}</label>
                  <input
                    {...form.register("phone")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="(559) 555-0100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">{t('form.service')} *</label>
                  <select
                    {...form.register("service")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="hvac">{t('form.service.hvac')}</option>
                    <option value="refrigeration">{t('form.service.refrigeration')}</option>
                    <option value="maintenance">{t('form.service.maintenance')}</option>
                    <option value="emergency">{t('form.service.emergency')}</option>
                    <option value="other">{t('form.service.other')}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">{t('form.message')} *</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Describe your issue or request..."
                />
                {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full text-lg"
                disabled={submitContact.isPending}
              >
                {submitContact.isPending ? t('btn.submitting') : t('btn.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
