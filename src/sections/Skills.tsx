import { SKILLS, LANGUAGES } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display font-extrabold text-slate-900 text-4xl tracking-tight mb-10">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 bg-white hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-default"
            >
              {skill}
            </span>
          ))}
          {LANGUAGES.map((lang) => (
            <span
              key={lang}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-amber-200 text-amber-700 bg-amber-50 hover:border-amber-400 transition-colors duration-150 cursor-default"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
