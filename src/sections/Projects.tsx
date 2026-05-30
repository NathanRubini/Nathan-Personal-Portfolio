import { ContainerScroll } from "@/components/ui/container-scroll-animation";

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
          <img
            src="/hack-the-globe-preview.jpg"
            alt="Hack the Globe project screenshot"
            className="w-full h-auto"
          />
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
