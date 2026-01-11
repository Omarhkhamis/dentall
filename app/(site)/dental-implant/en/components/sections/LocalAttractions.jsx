import { localAttractionsDefaults } from "../../../../../../lib/sectionDefaults";

export default function LocalAttractions({ data, whatsappLink }) {
  const content = data || localAttractionsDefaults;
  const attractions = content.items || [];
  const resolvedWhatsappLink =
    whatsappLink || "https://wa.me/+905465266449";
  return (
    <section
      id="local-attractions"
      className="relative overflow-hidden bg-white py-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -top-44 -right-44 h-[560px] w-[560px] rounded-full bg-copper-200/18 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-52 -left-52 h-[640px] w-[640px] rounded-full bg-copper-300/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -left-40 top-28 h-px w-[140%] rotate-[-8deg] bg-gradient-to-r from-transparent via-copper-400/30 to-transparent"></div>

      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.34em] uppercase text-main-400">
            {content.kicker}
          </p>

          <h2 className="mt-3 text-5xl lg:text-5xl font-extralight text-main-900 tracking-tight leading-[1.05]">
            {content.title}
            <span className="block mt-2 h-[2px] w-58 xl:w-78 bg-copper-500/80 rounded-full"></span>
          </h2>

          <p className="mt-4 text-sm sm:text-[15px] font-light text-main-600">
            {content.description}
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="flex gap-6 overflow-x-auto pb-3 no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible">
            {attractions.map((item) => (
              <article
                key={item.title}
                className="group relative w-[86%] shrink-0 snap-start rounded-[28px] border border-main-200/60 bg-white overflow-hidden lg:col-span-3 lg:w-auto transition-all duration-500 ease-out hover:border-copper-200/80 hover:scale-[1.003] hover:bg-[linear-gradient(180deg,rgba(217,124,33,0.02),rgba(255,255,255,0))] hover:shadow-[0_10px_32px_rgba(17,17,17,0.08)]"
              >
                <div className="relative aspect-[16/10] bg-main-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent"></div>

                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-3 rounded-full px-3 py-2 bg-black/40 backdrop-blur border border-white/15 text-[11px] uppercase tracking-[0.18em] text-white/90 whitespace-nowrap">
                      <span className="inline-flex items-baseline gap-1">
                        <b className="font-medium">{item.minutes}</b>
                        <span className="text-white/70">min</span>
                      </span>
                      <span className="h-3 w-px bg-white/20"></span>
                      <span className="inline-flex items-baseline gap-1">
                        <b className="font-medium">
                          {item.distance.split(" ")[0]}
                        </b>
                        <span className="text-white/70">km</span>
                      </span>
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-7">
                  <p className="text-[11px] font-medium tracking-[0.26em] uppercase text-main-400 whitespace-nowrap">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-xl lg:text-[22px] font-light text-main-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed min-h-30 sm:min-h-30 md:min-h-45 xl:min-h-40 2xl:min-h-28 font-light text-main-600">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-main-200/70 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-main-400">
                      Distance
                    </span>
                    <span className="text-[12px] font-light tracking-[0.08em] text-main-800">
                      {item.distance}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-4 text-center text-[14px] font-light text-copper-700 lg:hidden">
            {content.swipeHint}</p>
        </div>

        <div className="mt-10">
          <a
            href={resolvedWhatsappLink}
            target="_blank"
            className="inline-block"
            rel="noreferrer"
          >
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 text-white shadow-[0_10px_10px_rgba(0,0,0,0.09)] hover:from-copper-700 hover:to-copper-500 px-4 py-3 text-[11.5px] font-medium uppercase tracking-[0.13em] inline-flex items-center justify-center cursor-pointer transition-transform duration-200 ease-out disabled:opacity-60 disabled:pointer-events-none"
            >
              <i className="fa-brands fa-whatsapp text-[15px] opacity-90 mr-2"></i>
              {content.ctaText}</button>
          </a>
        </div>
      </div>
    </section>
  );
}
