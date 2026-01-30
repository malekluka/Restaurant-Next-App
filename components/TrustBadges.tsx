const TrustBadges = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Fast Delivery */}
          <div className="text-center group p-4 rounded-xl hover:bg-[var(--primary-cream)] transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[var(--primary-gold)]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--primary-gold)]/20 group-hover:scale-110">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-display text-[var(--primary-deep)] mb-1">
              Fast Delivery
            </h3>
            <p className="text-sm text-[var(--accent-charcoal)]">30 mins or less</p>
          </div>

          {/* Fresh Ingredients */}
          <div className="text-center group p-4 rounded-xl hover:bg-[var(--primary-cream)] transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[var(--primary-gold)]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--primary-gold)]/20 group-hover:scale-110">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-display text-[var(--primary-deep)] mb-1">
              Fresh Ingredients
            </h3>
            <p className="text-sm text-[var(--accent-charcoal)]">Quality guaranteed</p>
          </div>

          {/* Best Prices */}
          <div className="text-center group p-4 rounded-xl hover:bg-[var(--primary-cream)] transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[var(--primary-gold)]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--primary-gold)]/20 group-hover:scale-110">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-display text-[var(--primary-deep)] mb-1">
              Best Prices
            </h3>
            <p className="text-sm text-[var(--accent-charcoal)]">Value for money</p>
          </div>

          {/* Made with Love */}
          <div className="text-center group p-4 rounded-xl hover:bg-[var(--primary-cream)] transition-all duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[var(--primary-gold)]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--primary-gold)]/20 group-hover:scale-110">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--primary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-display text-[var(--primary-deep)] mb-1">
              Made with Love
            </h3>
            <p className="text-sm text-[var(--accent-charcoal)]">Chef&apos;s special care</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;