import { useI18n } from "@/lib/i18n";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const { t } = useI18n();

  const reviews = [
    {
      name: "Michael R.",
      role: "Restaurant Owner",
      text: "Our walk-in cooler went down on a Friday night in the middle of summer. ColdSpace Solutions had a tech out within an hour. They saved thousands of dollars in inventory. Customers for life!",
      rating: 5,
      date: "August 2024"
    },
    {
      name: "Sarah Jenkins",
      role: "Homeowner",
      text: "Very professional team. They replaced our old HVAC unit with a new high-efficiency model. The price was exactly what they quoted, no surprises. Our house has never felt this comfortable.",
      rating: 5,
      date: "June 2024"
    },
    {
      name: "David T.",
      role: "Facility Manager",
      text: "We use them for our quarterly preventative maintenance on all rooftop units. Since switching to ColdSpace, our emergency repair calls have dropped to almost zero. Highly recommended.",
      rating: 5,
      date: "October 2024"
    },
    {
      name: "Elena G.",
      role: "Cafe Manager",
      text: "Our ice machine wasn't producing. They diagnosed the issue quickly, had the part on the truck, and fixed it in one visit. Excellent service.",
      rating: 4,
      date: "September 2024"
    },
    {
      name: "James Wilson",
      role: "Homeowner",
      text: "The technician was polite, wore shoe covers, and explained exactly what was wrong with our AC. Honest company, fair pricing.",
      rating: 5,
      date: "July 2024"
    },
    {
      name: "Central Valley Logistics",
      role: "Commercial Client",
      text: "Managing a large warehouse requires reliable climate control. ColdSpace has been our go-to contractor for 3 years. They are simply the best in the area.",
      rating: 5,
      date: "November 2024"
    }
  ];

  return (
    <main className="w-full bg-background pb-24">
      {/* Header */}
      <section className="bg-primary pt-24 pb-20 text-center text-white relative">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">{t('test.title')}</h1>
          <p className="text-xl text-primary-foreground/80">
            {t('test.subtitle')}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-card p-8 rounded-2xl shadow-lg border border-border flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
              <Quote className="text-secondary/20 w-12 h-12 mb-4" />
              <p className="text-foreground/90 italic mb-6 flex-grow text-lg">"{review.text}"</p>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <div className="border-t border-border pt-4">
                <h4 className="font-bold text-foreground">{review.name}</h4>
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                  <span>{review.role}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
