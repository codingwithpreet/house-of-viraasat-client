export default function InstagramGallery() {
  const images = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400",
      alt: "Silk Sherwani embroidery closeup detail",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80&w=400",
      alt: "Pearl beads Mala styling",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=400",
      alt: "Chanderi Maroon Kurta modeling stance",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
      alt: "Banarasi Bundi gold brocade weaves",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block">
            ATELIER DIARIES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1C] font-normal tracking-wide">
            Moments in Craftsmanship
          </h2>
          <span className="text-[10px] tracking-wider uppercase text-[#1C1C1C]/50 font-sans block mt-1">
            Follow @HouseOfViraasat
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square overflow-hidden border border-[#E5E1DA] bg-[#F5F2ED] group"
            >
              <img
                src={img.imageUrl}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-[10px] tracking-widest uppercase font-medium font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Story
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
