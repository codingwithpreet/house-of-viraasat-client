import { Award, Sparkles, Ruler, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Handcrafted Legacy",
      description:
        "Every Sherwani and Bandhgala represents over 180 hours of legacy hand-embroidery by master zardosi and tilla craftsmen.",
    },
    {
      icon: Sparkles,
      title: "Sovereign Fabrics",
      description:
        "We source authentic Banarasi Brocade, organic Bhagalpur Mulberry raw silk, and premium count Chanderi silk.",
    },
    {
      icon: Ruler,
      title: "Atelier Tailoring",
      description:
        "Structured shoulders, semi-canvased chest construction with horsehair interlining for an architectural, posture-enhancing fit.",
    },
    {
      icon: ShieldCheck,
      title: "Heritage Insignia",
      description:
        "Authentic double-layered linings, custom brass crest buttons, and secure wax-sealed premium box deliveries.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5F2ED] border-y border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block">
            THE ATELIER STANDARD
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1C] font-normal tracking-wide">
            Crafting Generational Legacy
          </h2>
          <div className="w-12 h-px bg-[#C5A059]/40 mx-auto mt-4" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <div
                key={i}
                className="text-center space-y-4 p-6 bg-[#FDFCFB] border border-[#E5E1DA]/65 group hover:border-[#C5A059] transition-colors duration-300"
              >
                <div className="flex justify-center">
                  <IconComponent className="w-8 h-8 text-[#C5A059] stroke-[1.25] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-serif text-sm text-[#1C1C1C] font-medium">{f.title}</h3>
                <p className="font-sans text-xs text-[#1C1C1C]/60 leading-relaxed max-w-xs mx-auto">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
