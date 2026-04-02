import { ArrowRight, BookOpen, BrainCircuit, FolderOpen, MessageSquare, Search, UploadCloud } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Ingest your knowledge",
    description:
      "Upload PDFs, point to a URL, or paste raw text. Contiq extracts and vectorises every byte so nothing gets lost.",
    tags: ["PDF files", "Web pages", "Plain text"],
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Semantic retrieval",
    description:
      "Each query is turned into an embedding and matched against your indexed chunks using cosine similarity — far beyond keyword search.",
    tags: ["Vector search", "Context ranking", "RAG pipeline"],
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Chat with your documents",
    description:
      "Ask anything in natural language. The AI grounds every answer in the relevant passages from your own sources — no hallucinations, just facts.",
    tags: ["GPT-4o mini", "Source references", "Multi-turn"],
  },
] as const;

const HIGHLIGHTS = [
  { icon: FolderOpen, text: "Organise sources into projects" },
  { icon: Search, text: "Per-project semantic search" },
  { icon: BookOpen, text: "Full conversation history" },
] as const;

export function FeaturesSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100">
            <BrainCircuit size={16} className="text-brand-600" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-2xl font-semibold italic text-brand-900">
            What is Contiq?
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-brand-500">
          Contiq turns scattered documents into a conversational knowledge base.
          Bring your PDFs, articles, and notes into one place — then ask questions
          and get answers that cite the source.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {STEPS.map(({ number, icon: Icon, title, description, tags }, index) => (
          <div key={number} className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 ring-1 ring-brand-200">
                <Icon size={16} className="text-brand-700" strokeWidth={1.5} />
              </div>
              {index < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-brand-100" style={{ minHeight: "1.5rem" }} />
              )}
            </div>
            <div className="pb-5 pt-1.5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold tracking-widest text-brand-300">{number}</span>
                <h3 className="text-sm font-semibold text-brand-800">{title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-brand-400">{description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {HIGHLIGHTS.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex flex-col items-center gap-2 rounded-xl border border-brand-100 bg-white/50 px-4 py-4 text-center"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
              <Icon size={15} className="text-brand-500" strokeWidth={1.5} />
            </div>
            <p className="text-xs font-medium leading-snug text-brand-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-brand-200/50 bg-white/60 px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-brand-800">Ready to get started?</p>
          <p className="text-xs text-brand-400">Create a project and add your first source.</p>
        </div>
        <a
          href="/projects"
          className="flex items-center gap-1.5 rounded-xl bg-brand-800 px-4 py-2 text-xs font-semibold text-sand transition-colors hover:bg-brand-700"
        >
          Open Projects <ArrowRight size={12} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}
