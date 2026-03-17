import { useI18n } from "@/lib/i18n";
import { CheckCircle, Award, Users, Target } from "lucide-react";

export default function About() {
  const { t } = useI18n();

  return (
    <main className="w-full pb-24">
      {/* Header */}
      <section className="bg-primary pt-20 pb-20 text-center text-white relative">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">{t('nav.about')}</h1>
          <p className="text-xl text-primary-foreground/80">
            Dedicated to bringing comfort and reliability to the Central Valley.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in the heart of California's Central Valley, ColdSpace Solutions was built on a simple premise: provide honest, high-quality HVAC and refrigeration services without the runaround.
              </p>
              <p>
                We know how brutal the Valley heat can be, and how critical refrigeration is for local businesses, farms, and restaurants. That's why we’ve assembled a team of highly trained, certified technicians who treat every job—from a simple home AC tune-up to a massive commercial walk-in freezer repair—with the utmost urgency and professionalism.
              </p>
              <p>
                Today, we are proud to be the trusted partner for countless families and businesses. Our commitment to transparent pricing, fast response times, and doing the job right the first time remains our core focus.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/10 translate-x-4 translate-y-4 rounded-3xl"></div>
            <img 
              src={`${import.meta.env.BASE_URL}images/tech-team.png`} 
              alt="ColdSpace Team" 
              className="relative rounded-3xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Award size={48} className="mx-auto text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Excellence</h3>
              <p className="text-muted-foreground">We never cut corners. Every repair and installation meets the highest industry standards.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Users size={48} className="mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Community</h3>
              <p className="text-muted-foreground">Locally owned and operated, we treat our Central Valley customers like family.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Target size={48} className="mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2">Reliability</h3>
              <p className="text-muted-foreground">Available 24/7. When you have an emergency, we are there to solve the problem fast.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
