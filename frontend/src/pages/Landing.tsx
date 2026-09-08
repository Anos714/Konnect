import { ArrowRight, Globe2, MessageCircle, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";

const Landing = () => {
  return (
    <main className="landing-page min-h-screen overflow-hidden bg-[#07111f] text-white">
      <nav className="landing-nav mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Konnect home">
          <span className="brand-mark"><MessageCircle size={18} strokeWidth={2.5} /></span>
          <span className="text-lg font-semibold tracking-tight">Konnect</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white sm:inline-flex">
            Sign in
          </Link>
          <Link to="/register" className="landing-button landing-button-small">
            Get started <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        <div className="landing-glow landing-glow-one" />
        <div className="relative z-10">
          <div className="landing-eyebrow"><Sparkles size={14} /> Language exchange, reimagined</div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Your next conversation could change your world.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            Meet curious people, practice languages in real conversations, and build friendships that travel further than any textbook.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="landing-button">
              Start connecting <ArrowRight size={17} />
            </Link>
            <Link to="/login" className="landing-button-ghost">
              I already have an account
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Globe2 size={16} className="text-cyan-300" /> 90+ languages</span>
            <span className="flex items-center gap-2"><Users size={16} className="text-cyan-300" /> People-first community</span>
          </div>
        </div>

        <div className="relative z-10">
          <div className="landing-orbit-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[.2em] text-slate-400">Find your people</span>
              <span className="landing-live-dot">Live</span>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <img src="/register.png" alt="" className="h-16 w-16 rounded-2xl object-cover object-top ring-1 ring-white/20" />
              <div>
                <p className="font-medium">A world of voices</p>
                <p className="mt-1 text-sm text-slate-400">One thoughtful hello away.</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="landing-stat"><strong>01</strong><span>Choose a language</span></div>
              <div className="landing-stat"><strong>02</strong><span>Meet a partner</span></div>
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_4px_rgba(110,231,183,.25)]" />
                <span className="text-sm text-slate-300">Your conversation is waiting.</span>
              </div>
            </div>
          </div>
          <div className="landing-floating-card landing-floating-top"><span>Bonjour</span><span className="text-slate-500">→</span><span>नमस्ते</span></div>
          <div className="landing-floating-card landing-floating-bottom"><MessageCircle size={16} className="text-cyan-300" /> Real people. Real progress.</div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[.025]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-8">
          {[
            ["01", "Talk naturally", "Practice the language you actually want to use."],
            ["02", "Find your rhythm", "Connect around shared goals, interests, and curiosity."],
            ["03", "Keep growing", "Turn every chat into confidence that sticks."],
          ].map(([number, title, copy]) => (
            <div key={number} className="landing-feature">
              <span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Landing;
