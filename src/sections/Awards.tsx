import { AWARDS } from "@/data/resume";

export function Awards() {
  return (
    <section id="awards" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display font-extrabold text-slate-900 text-4xl tracking-tight mb-12">
          Awards &amp; Scholarships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AWARDS.map((award) => (
            <div
              key={award.name}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-4 mb-3">
                {award.logoUrl && (
                  <img
                    src={award.logoUrl}
                    alt={award.org}
                    className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-100 p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <div className="min-w-0">
                  <div className="font-display font-bold text-slate-900 text-base leading-snug">
                    {award.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {award.org}
                  </div>
                </div>
              </div>

              {award.amount && (
                <div className="font-bold text-green-600 text-sm">
                  {award.amount}
                </div>
              )}
              {award.description && (
                <p className="mt-2 text-slate-500 text-sm leading-relaxed italic">
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
