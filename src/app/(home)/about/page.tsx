import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { TokenSection } from "./components/TokenSection/TokenSection";
import { FeaturesSection } from "./components/FeaturesSection/FeaturesSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Contiq — the AI-powered document intelligence platform.",
  openGraph: {
    title: "About",
    description:
      "Learn about Contiq — the AI-powered document intelligence platform.",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-8 py-10">

        {/* Hero */}
        <div className="mb-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-sienna/30 bg-sienna/8 px-3 py-1">
              <Sparkles size={11} className="text-sienna" strokeWidth={2} />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-sienna">
                AI Document Intelligence
              </span>
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold italic leading-tight text-brand-900">
            Your documents,<br />
            <span className="text-sienna">finally searchable.</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-brand-500">
            Contiq indexes anything you throw at it — PDFs, web pages, raw text — and
            lets you have a natural conversation with all of it at once.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <TokenSection />
          <div className="border-t border-brand-100" />
          <FeaturesSection />
        </div>

        <p className="mt-12 text-center text-[11px] text-brand-300">
          Contiq · AI-powered document intelligence
        </p>
      </div>
    </div>
  );
}
