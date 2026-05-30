import { EXPERIENCE } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display font-extrabold text-slate-900 text-4xl tracking-tight mb-16">
          Experience
        </h2>

        {EXPERIENCE.map((job, i) => (
          <div key={job.company}>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
              {/* Left: meta */}
              <div>
                {job.logoUrl ? (
                  <img
                    src={job.logoUrl}
                    alt={job.company}
                    className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-2 object-contain"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
                      <path d="M12 3v18M5 6l7-3 7 3M3 9l4 8H3l4-8zm14 0l4 8h-8l4-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 17h18" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div className="font-display font-bold text-slate-900 text-base mt-3">
                  {job.company}
                </div>
                <div className="text-slate-500 text-sm mt-0.5">{job.role}</div>
                <div className="text-slate-400 text-xs mt-1 font-mono">{job.period}</div>
              </div>

              {/* Right: bullets */}
              <ul className="space-y-3 pt-1">
                {job.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-300" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {i < EXPERIENCE.length - 1 && (
              <hr className="border-slate-100 my-14" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
