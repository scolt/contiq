import { AlignLeft, Coins, FileText, Globe, MessageSquare } from "lucide-react";

const TOKEN_ITEMS = [
  {
    icon: FileText,
    label: "File upload",
    cost: 10,
    description: "PDF documents are extracted, chunked, and embedded into a searchable vector store.",
    iconColor: "text-sienna",
    iconBg: "bg-sienna/10",
    costColor: "text-sienna",
    border: "border-sienna/20",
  },
  {
    icon: Globe,
    label: "URL import",
    cost: 8,
    description: "Web pages are fetched via Jina Reader, cleaned, and indexed up to 50,000 characters.",
    iconColor: "text-cognac",
    iconBg: "bg-cognac/10",
    costColor: "text-cognac",
    border: "border-cognac/20",
  },
  {
    icon: AlignLeft,
    label: "Text snippet",
    cost: 3,
    description: "Raw text is split and vectorised immediately — the fastest way to add a knowledge source.",
    iconColor: "text-umber",
    iconBg: "bg-umber/10",
    costColor: "text-umber",
    border: "border-umber/20",
  },
  {
    icon: MessageSquare,
    label: "Chat message",
    cost: 1,
    description: "Each query you send runs semantic retrieval and calls the AI model on your behalf.",
    iconColor: "text-forest",
    iconBg: "bg-forest/10",
    costColor: "text-forest",
    border: "border-forest/20",
  },
] as const;

export function TokenSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sienna/10">
            <Coins size={16} className="text-sienna" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-2xl font-semibold italic text-brand-900">
            How tokens work
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-brand-500">
          Contiq uses a token economy to meter compute costs. Every action that processes
          or queries your data deducts tokens from your balance. Different operations carry
          different costs depending on their complexity.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TOKEN_ITEMS.map(({ icon: Icon, label, cost, description, iconColor, iconBg, costColor, border }) => (
          <div
            key={label}
            className={`flex flex-col gap-3 rounded-2xl border bg-white/70 p-5 backdrop-blur-sm ${border}`}
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon size={17} className={iconColor} strokeWidth={1.5} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`font-display text-3xl font-bold tabular-nums leading-none ${costColor}`}>
                  {cost}
                </span>
                <span className="text-xs text-brand-400">tokens</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-brand-800">{label}</p>
              <p className="text-xs leading-relaxed text-brand-400">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200/60 bg-amber-50/60 px-4 py-3">
        <Coins size={14} className="mt-0.5 flex-shrink-0 text-amber-600" strokeWidth={1.5} />
        <p className="text-xs leading-relaxed text-amber-700">
          When your token balance reaches zero, processing and chat are paused until more tokens are granted.
          New accounts start with <span className="font-semibold">10 tokens</span>.
        </p>
      </div>
    </section>
  );
}
