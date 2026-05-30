import { PERSONAL } from "@/data/resume";

export function Contact() {
  return (
    <section id="contact" className="bg-slate-900 py-24 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Contact content */}
        <div className="text-center">
          <h2 className="font-display font-extrabold text-white text-4xl md:text-5xl tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
            Open to internships, case competitions, and interesting conversations.
          </p>

          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="px-6 py-3 bg-white text-slate-900 rounded-xl font-medium text-sm hover:bg-slate-100 transition-colors duration-150 cursor-pointer"
            >
              Send an Email
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-600 text-slate-300 rounded-xl font-medium text-sm hover:border-slate-400 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              View LinkedIn ↗
            </a>
          </div>

          <div className="text-slate-500 text-sm mt-6 font-mono">
            {PERSONAL.email}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 py-6 mt-16 flex justify-between items-center flex-wrap gap-4">
          <span className="text-slate-400 text-sm font-display font-medium">
            Nathan Rubini
          </span>
          <span className="text-slate-600 text-xs font-mono">
            © 2025 · React + Vite · GitHub Pages
          </span>
        </div>
      </div>
    </section>
  );
}
