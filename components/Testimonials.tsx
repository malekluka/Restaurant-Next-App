
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Enthusiast",
      image: "/testimonial1.jpg", // Add your images or use placeholder
      rating: 5,
      text: "Absolutely amazing! The food quality is outstanding and delivery is always on time. My go-to place for special occasions.",
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      image: "/testimonial2.jpg",
      rating: 5,
      text: "Best restaurant in town! The flavors are authentic, portions are generous, and the service is impeccable. Highly recommend!",
    },
    {
      name: "Emma Davis",
      role: "Food Blogger",
      image: "/testimonial3.jpg",
      rating: 5,
      text: "A culinary masterpiece! Every dish is crafted with passion and precision. The presentation alone is worth the visit.",
    },
  ];

  return (
    <section className="bg-[var(--primary-cream)] py-16">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--primary-gold)] text-sm tracking-widest uppercase font-medium mb-3">
            Customer Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-display text-[var(--primary-deep)]">
            What People Say
          </h2>
          <div className="divider mx-auto mt-4"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[var(--primary-gold)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[var(--accent-charcoal)] mb-6 italic leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--neutral-200)]">
                <div className="w-12 h-12 rounded-full bg-[var(--primary-gold)]/10 flex items-center justify-center overflow-hidden">
                  {/* If you don't have images, use initials */}
                  <span className="text-[var(--primary-gold)] font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  {/* Uncomment if you add images:
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--primary-deep)] text-display">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-[var(--accent-charcoal)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Add More Reviews Link */}
        <div className="text-center mt-12">
          <button className="btn-outline">
            Read All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;