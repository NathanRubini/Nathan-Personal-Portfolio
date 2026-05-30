import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const stats = [
  { value: "232", label: "Students" },
  { value: "21",  label: "Countries" },
  { value: "2nd", label: "Place" },
];

function BasisMockup() {
  return (
    <div className="w-full bg-slate-900 min-h-[420px] flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-400/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <div className="w-3 h-3 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-4 h-5 bg-slate-700 rounded text-xs text-slate-400 flex items-center px-3 font-mono">
          basis — fintech for gig workers
        </div>
      </div>

      {/* App content */}
      <div className="flex-1 p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-xl font-display">Basis</div>
            <div className="text-slate-400 text-xs mt-0.5">Credit Access for Gig Workers</div>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
            Live
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
              <div className="text-white font-display font-extrabold text-2xl">{s.value}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Credit Scoring", desc: "Gig income analysis" },
            { title: "Instant Approval", desc: "AI-powered decisions" },
            { title: "Low Rates", desc: "Fair lending model" },
            { title: "Dashboard", desc: "Repayment tracking" },
          ].map((f) => (
            <div key={f.title} className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
              <div className="text-white text-sm font-medium">{f.title}</div>
              <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer tag */}
        <div className="text-center text-slate-500 text-xs font-mono">
          BCG × Global Spark · Hack the Globe · January 2026
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const titleComponent = (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-4">
        2nd Place · Hack the Globe · BCG × Global Spark · January 2026
      </div>
      <h2 className="font-display font-extrabold text-slate-900 text-4xl tracking-tight">
        Cases &amp; Competition Wins
      </h2>
      <p className="text-slate-500 text-base mt-3 max-w-xl mx-auto">
        Basis — Fintech Platform for Gig Worker Credit · 232 students · 21 countries
      </p>
    </div>
  );

  return (
    <section id="projects" className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <ContainerScroll titleComponent={titleComponent}>
          <BasisMockup />
        </ContainerScroll>

        <div className="flex justify-center gap-4 mt-0">
          <a
            href="https://github.com/CooperMcKay/Hack-the-Globe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition-colors duration-150 cursor-pointer"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
