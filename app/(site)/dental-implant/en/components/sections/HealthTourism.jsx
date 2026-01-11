import { healthTourismDefaults } from "../../../../../../lib/sectionDefaults";

export default function HealthTourism({ data }) {
  const content = data || healthTourismDefaults;
  const steps = content.steps || [];
  return (
    <section
      id="health-tourism"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 lg:py-32"
    >
      <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-medium tracking-[0.32em] uppercase text-main-400">
            {content.kicker}
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-5xl font-extralight text-main-900 tracking-tight">
            {content.title}
          </h2>
          <p className="mt-4 text-sm sm:text-[17px] font-light text-main-600">
            {content.description}
          </p>
        </div>

        <div className="relative mt-14 hidden lg:block">
          <div className="absolute inset-x-16 top-6 h-px bg-gradient-to-r from-main-100 via-main-200 to-main-100"></div>
        </div>

        <div className="mt-8 lg:mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-main-200 shadow-sm">
                <i className={`fa-solid ${step.icon} text-copper-500 text-xl`}></i>
              </div>

              <h3 className="mt-5 text-md justify-items-center items-center justify-center gap-2 font-light tracking-[0.03em] capitalize text-main-900">
                <span className="flex  items-center justify-center rounded-full text-[12px] font-normal text-gray-500">
                  {step.label}
                </span>
                <span>{step.title}</span>
              </h3>

              <p className="mt-3 text-sm leading-relaxed font-extralight text-main-600 max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
