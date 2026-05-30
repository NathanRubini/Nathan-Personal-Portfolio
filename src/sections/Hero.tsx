import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedRole } from "@/components/ui/animated-hero";
import { PERSONAL } from "@/data/resume";

export function Hero() {
  return (
    <section id="about" className="relative">
      <AuroraBackground className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-center">
            {/* Photo */}
            <div className="flex justify-center md:justify-start">
              <img
                src={PERSONAL.headshotUrl}
                alt="Nathan Rubini"
                className="w-[240px] h-[240px] rounded-2xl object-cover object-top shadow-lg"
              />
            </div>

            {/* Text */}
            <div>
              <h1 className="font-display font-extrabold text-black leading-[0.93] tracking-[-3px] text-[clamp(52px,7vw,88px)]">
                {PERSONAL.name}
              </h1>
              <div className="mt-3 font-display font-bold text-slate-400 text-[clamp(24px,3vw,36px)] tracking-tight">
                <AnimatedRole titles={PERSONAL.roleTitles} />
              </div>
              <p className="text-slate-500 text-lg mt-4 max-w-md">
                {PERSONAL.description}
              </p>
              <div className="flex gap-4 mt-8 flex-wrap">
                <a
                  href="#experience"
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors duration-150 cursor-pointer text-sm"
                >
                  View My Work →
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:border-slate-500 hover:text-slate-900 transition-colors duration-150 cursor-pointer text-sm"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
