"use client";

import { faqs } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import JsonLd from "../seo/JsonLd";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <Section
      id="faq"
      kicker="frequently asked"
      title={
        <>
          Questions &amp; <span className="text-aurora">answers</span>
        </>
      }
    >
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={(i % 4) * 70}>
            <details className="glass group rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="shrink-0 text-cyan transition-transform duration-300 group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
