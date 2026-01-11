import { clinicDefaults } from "../../../../../../lib/sectionDefaults";

export default function ClinicSec({ data, whatsappLink }) {
  const content = data || clinicDefaults;
  const images = content.images || [];
  const resolvedWhatsappLink =
    whatsappLink || "https://wa.me/+905465266449";
  return (
    <section className=" overflow-hidden bg-gray-100 py-16 lg:py-28 ">
      <div className="mx-auto max-w-screen-2xl px-0 ">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div className="-mx-4 sm:-mx-6 lg:-ml-10 lg:mr-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-main-100">
                  <img
                    src={images[0]?.src}
                    className="h-full w-full object-cover"
                    alt={images[0]?.alt}
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-main-100">
                  <img
                    src={images[1]?.src}
                    className="h-full w-full object-cover"
                    alt={images[1]?.alt}
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-main-100">
                  <img
                    src={images[2]?.src}
                    className="h-full w-full object-cover"
                    alt={images[2]?.alt}
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-main-100">
                  <img
                    src={images[3]?.src}
                    className="h-full w-full object-cover"
                    alt={images[3]?.alt}
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-main-100">
                  <img
                    src={images[4]?.src}
                    className="h-full w-full object-cover"
                    alt={images[4]?.alt}
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-main-100">
                  <img
                    src={images[5]?.src}
                    className="h-full w-full object-cover"
                    alt={images[5]?.alt}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-0 lg:mr-18">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-main-400 mb-3">
              {content.kicker}
            </p>

            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-extralight leading-tight text-main-900 mb-6">
              {content.titleLine1}
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                {content.titleLine2}
                <span className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-copper-500 rounded-full"></span>
              </span>
            </h2>

            <p className="text-[15px] sm:text-[16px] text-main-700 leading-relaxed mb-6">
              {content.paragraphs?.[0]}
            </p>

            <p className="text-[15px] sm:text-[16px] text-main-700 leading-relaxed mb-6">
              {content.paragraphs?.[1]}
            </p>

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
      </div>
    </section>
  );
}
