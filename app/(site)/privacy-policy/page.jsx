import Footer from "../dental-implant/en/components/Footer";
import Header from "../dental-implant/en/components/Header";
import { getGeneralSettings } from "../../../lib/generalSettings";
import { getPageBySlug } from "../../../lib/pages";

export const dynamic = "force-dynamic";

const renderParagraphs = (content) =>
  String(content || "")
    .split(/\n\s*\n/)
    .filter(Boolean);

export default async function PrivacyPolicyPage() {
  const [general, page] = await Promise.all([
    getGeneralSettings(),
    getPageBySlug("privacy-policy")
  ]);

  if (!page) {
    return null;
  }

  return (
    <>
      <Header general={general} />
      <main className="mx-auto max-w-screen-md px-6 lg:px-10 py-16 lg:py-20">
        <p className="text-[11px] uppercase tracking-[0.3em] text-main-400">
          Pages
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extralight text-main-900">
          {page.title}
        </h1>
        <div className="mt-6 space-y-4 text-sm sm:text-[15px] leading-relaxed text-main-700 font-light">
          {renderParagraphs(page.content).map((paragraph, index) => (
            <p key={`privacy-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </main>
      <Footer general={general} />
    </>
  );
}
