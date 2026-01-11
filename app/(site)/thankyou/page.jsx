import Footer from "../dental-implant/en/components/Footer";
import Header from "../dental-implant/en/components/Header";
import { getGeneralSettings } from "../../../lib/generalSettings";
import { getPageBySlug } from "../../../lib/pages";

export const dynamic = "force-dynamic";

const renderParagraphs = (content) =>
  String(content || "")
    .split(/\n\s*\n/)
    .filter(Boolean);

const normalizeDigits = (value) => String(value || "").replace(/[^\d]/g, "");

export default async function ThankYouPage() {
  const [general, page] = await Promise.all([
    getGeneralSettings(),
    getPageBySlug("thankyou")
  ]);

  if (!page) {
    return null;
  }

  const paragraphs = renderParagraphs(page.content);
  const whatsappNumber = normalizeDigits(general?.whatsappNumber || "");
  const phoneHref = general?.phone
    ? `tel:${general.phone.replace(/[^\d+]/g, "")}`
    : null;
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;

  return (
    <>
      <Header general={general} />
      <main className="relative overflow-hidden bg-gradient-to-br from-main-950 via-main-900 to-main-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-20%] top-[-10%] h-64 w-64 rounded-full bg-copper-600/20 blur-[100px]" />
          <div className="absolute right-[-15%] bottom-[-20%] h-72 w-72 rounded-full bg-copper-500/25 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_45%)]" />
        </div>

        <section className="relative mx-auto flex min-h-[68vh] max-w-screen-xl flex-col items-center justify-center gap-10 px-6 py-16 text-center lg:px-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-main-100 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/90 text-white shadow-lg">
              <i className="fa-solid fa-check" />
            </span>
            <span className="text-xs font-semibold text-white">
              Request Received
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extralight tracking-[0.01em] text-white">
              {page.title}
            </h1>
          </div>

          <div className="mx-auto mt-2 max-w-3xl space-y-3 text-[15px] leading-relaxed text-main-100/85">
            {paragraphs.length ? (
              paragraphs.map((paragraph, index) => (
                <p key={`thankyou-paragraph-${index}`}>{paragraph}</p>
              ))
            ) : (
              <p>
                We&apos;ll call you shortly to confirm your details and book the best
                available time for you.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer general={general} />
    </>
  );
}
