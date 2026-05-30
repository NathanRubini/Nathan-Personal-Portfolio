import { STATS } from "@/data/resume";

export function Stats() {
  return (
    <section className="py-16 border-y border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 divide-x divide-slate-100">
          {STATS.map((stat) => (
            <div key={stat.label} className="py-8 px-4 text-center">
              <div className="font-display font-extrabold text-slate-900 text-5xl md:text-6xl tracking-tight">
                {stat.value}
                <span className="text-slate-400">{stat.suffix}</span>
              </div>
              <div className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
