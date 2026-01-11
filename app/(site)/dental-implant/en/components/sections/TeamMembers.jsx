"use client";

import { useRef } from "react";
import { teamMembersDefaults } from "../../../../../../lib/sectionDefaults";

export default function TeamMembers({ data }) {
  const content = data || teamMembersDefaults;
  const members = content.items || [];
  const sliderRef = useRef(null);

  const scrollByAmount = (direction) => {
    const node = sliderRef.current;
    if (!node) return;
    const amount = Math.round(node.clientWidth * 0.9);
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    const atStart = node.scrollLeft <= 0;
    const atEnd = node.scrollLeft >= maxScrollLeft - 1;

    if (direction > 0 && atEnd) {
      node.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && atStart) {
      node.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      return;
    }

    node.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      id="team-members"
      className="relative bg-gradient-to-b from-gray-100 via-white to-gray-50 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium tracking-[0.32em] uppercase text-main-400">
            {content.kicker}
          </p>

          <h2 className="mt-3 text-3xl sm:text-3xl lg:text-5xl font-extralight text-main-900 tracking-tight">
            {content.title}
          </h2>

          <p className="mt-4 text-sm sm:text-[17px] font-light text-main-600">
            {content.description}
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="relative">
            <button
              type="button"
              aria-label="السابق"
              onClick={() => scrollByAmount(-1)}
              className="sm:hidden absolute -left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-main-200 bg-white/90 p-3 text-main-700 shadow-md transition hover:bg-white"
            >
              {"<"}
            </button>
            <button
              type="button"
              aria-label="التالي"
              onClick={() => scrollByAmount(1)}
              className="sm:hidden absolute -right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-main-200 bg-white/90 p-3 text-main-700 shadow-md transition hover:bg-white"
            >
              {">"}
            </button>

            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-3 no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
            >
            {members.map((member) => (
              <article
                key={member.name}
                className="group w-[85%] shrink-0 snap-start rounded-3xl bg-white border border-main-200/70 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:w-auto"
              >
                <div className="relative aspect-[16/10] bg-main-50">
                  <img
                    src={member.image}
                    alt={member.alt || member.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10"></div>
                </div>

                <div className="p-6 lg:p-7">
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-copper-700/90">
                    {member.role}
                  </p>
                  <h3 className="mt-2 text-lg lg:text-[19px] font-light text-main-900">
                    {member.name}
                  </h3>

                  <div className="mt-3 h-[1px] w-16 rounded-full bg-copper-500/80"></div>

                  <p className="mt-4 text-sm leading-relaxed text-main-600 font-light">
                    {member.description}
                  </p>

                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
