import { fullWidthCampaignDefaults } from "../../../../../../lib/sectionDefaults";

export default function FullWidthCampaignBanner({ data }) {
  const content = data || fullWidthCampaignDefaults;
  return (
    <section className="relative w-full overflow-hidden bg-main-900">
      <img
        src={content.backgroundImage}
        alt={content.backgroundAlt}
        className="absolute inset-0 h-full w-full object-cover object-right [filter:saturate(0.95)_contrast(0.95)_brightness(0.75)]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10 sm:from-black/72 sm:via-black/40 sm:to-black/5"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_480px_at_20%_50%,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.65)_100%)]"></div>

      <div className="absolute inset-y-0 right-0 w-[40%] opacity-0 md:!opacity-100 sm:w-[55%] xl:w-[42%] pointer-events-none">
        <img
          src={content.overlayImage}
          alt={content.overlayAlt}
          className="h-full w-full object-cover object-right [filter:saturate(1.15)_contrast(1.05)_brightness(1.05)] [mask-image:linear-gradient(to_left,black_0%,black_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_0%,black_65%,transparent_100%)]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="flex min-h-[260px] sm:min-h-[320px] lg:min-h-[350px] items-end sm:items-center py-10 lg:py-10">
          <div className="max-w-2xl text-white relative">
            <div className="pointer-events-none absolute -left-10 -top-8 h-56 w-56 rounded-full bg-copper-500/18 blur-3xl"></div>
            <div className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/90 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <span className="h-1.5 w-1.5 rounded-full bg-copper-400"></span>
              {content.badge}
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
              {content.headingLine1}
              <span className="block mt-1 font-extralight">
                {content.headingLine2}
              </span>
            </h2>

            <div className="mt-5 h-px w-16 bg-copper-400/50"></div>

            <p className="mt-4 text-[15px] sm:text-[17px] font-extralight text-white/90 max-w-xl">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
