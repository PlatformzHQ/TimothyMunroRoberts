"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "../../content";
import Section from "../ui/Section";
import Reveal from "../fx/Reveal";
import Magnetic from "../fx/Magnetic";
import { useGame } from "../game/GameProvider";

type Errors = { name?: string; email?: string; quest?: string };

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", quest: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { unlock, burstConfetti, addXp } = useGame();

  // "First Contact" achievement when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          unlock("first-contact");
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [unlock]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please add your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = "Please check the email address.";
    if (values.quest.trim().length < 10) e.quest = "Tell me a bit more (10+ characters).";
    return e;
  };

  // mailto fallback if the network request fails
  const openMailFallback = () => {
    const body = encodeURIComponent(`${values.quest}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      "Message from " + values.name
    )}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    setFailed(false);
    try {
      // Delivered straight to my inbox via Formsubmit — no mail client needed.
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.quest,
          _subject: `Message from ${values.name}`,
          _template: "box",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setSent(true);
      burstConfetti();
      addXp(40, "quest-form");
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const field = (key: keyof typeof values) => ({
    value: values[key],
    onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: ev.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  const inputClass = (hasError?: string) =>
    `glass w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-cyan ${
      hasError ? "border-magenta animate-[shake_0.3s_ease]" : ""
    }`;

  return (
    <Section id="contact" kicker="get in touch" title={<>Start a <span className="text-aurora">Conversation</span></>}>
      <div ref={sectionRef} className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {sent ? (
          <div className="glass animate-pop-in flex flex-col items-center justify-center rounded-2xl p-10 text-center">
            <p className="text-4xl" aria-hidden>✅</p>
            <h3 className="font-display mt-3 text-xl font-bold">Message sent!</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Your message just landed in my inbox. I&apos;ll get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setValues({ name: "", email: "", quest: "" });
              }}
              className="mt-5 text-sm text-cyan hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4">
            <div>
              <label htmlFor="q-name" className="mb-1.5 block text-xs font-medium text-muted">
                Your name
              </label>
              <input id="q-name" type="text" placeholder="Jane Doe" className={inputClass(errors.name)} {...field("name")} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1.5 text-xs text-magenta">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="q-email" className="mb-1.5 block text-xs font-medium text-muted">
                Email
              </label>
              <input id="q-email" type="email" placeholder="jane@company.com" className={inputClass(errors.email)} {...field("email")} aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1.5 text-xs text-magenta">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="q-quest" className="mb-1.5 block text-xs font-medium text-muted">
                How can I help?
              </label>
              <textarea id="q-quest" rows={4} placeholder="Tell me about your company, your platform, or the problem you're trying to solve…" className={inputClass(errors.quest)} {...field("quest")} aria-invalid={!!errors.quest} />
              {errors.quest && <p className="mt-1.5 text-xs text-magenta">{errors.quest}</p>}
            </div>
            <Magnetic>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet via-magenta to-amber bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition-all hover:bg-right disabled:opacity-70"
              >
                {sending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>Send message →</>
                )}
              </button>
            </Magnetic>
            {failed && (
              <p className="text-xs text-magenta">
                Couldn&apos;t send just now —{" "}
                <button type="button" onClick={openMailFallback} className="underline hover:text-cyan">
                  email me directly instead
                </button>
                .
              </p>
            )}
          </form>
        )}

        <Reveal variant="right">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-semibold">Direct channels</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                  <span aria-hidden>📧</span> {profile.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.emailAlt}`} className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                  <span aria-hidden>📧</span> {profile.emailAlt}
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.emailAdvisory}`} className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                  <span aria-hidden>📧</span> {profile.emailAdvisory}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                  <span aria-hidden>📞</span> {profile.phone}
                </a>
              </li>
              {profile.linkedin && (
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                    <span aria-hidden>💼</span> LinkedIn — /in/platformz
                  </a>
                </li>
              )}
              <li>
                <a href={profile.platformz} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                  <span aria-hidden>🪐</span> Platformz — CEO
                </a>
              </li>
              {profile.fur4 && (
                <li>
                  <a href={profile.fur4} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                    <span aria-hidden>⚙️</span> FUR4 — COO &amp; CTO
                  </a>
                </li>
              )}
              {profile.calendar && (
                <li>
                  <a href={profile.calendar} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted transition-colors hover:text-cyan">
                    <span aria-hidden>📅</span> Book a call
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] leading-relaxed text-muted">
              Response time: usually &lt; 24h.
              <br />
              Timezone: {profile.location}.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
