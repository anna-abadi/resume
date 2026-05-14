import { useEffect, useRef } from 'react'
import { resume } from '../data/resume'
// 📸 Replace photo.svg with your actual photo (rename it to photo.jpg and update this import)
import photo from '../assets/photo.png'

function useCounter(ref, target, suffix = '') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      let current = 0
      const step = Math.ceil(target / 40)
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = current + suffix
        if (current >= target) clearInterval(timer)
      }, 30)
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-[32px] font-black tracking-tight text-white leading-none">{value}</div>
      <div className="text-[12px] text-[#888] mt-1">{label}</div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-[132px] pb-20 px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(91,127,255,0.08) 0%, transparent 70%)' }} />

      {/* Left */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-white/[0.07] rounded-full px-4 py-1.5 text-[12px] text-[#888] mb-7">
          <span className="w-[7px] h-[7px] rounded-full bg-green-400 animate-[pulse-dot_2s_infinite]" style={{ boxShadow: '0 0 6px #4ade80' }} />
          Open to New Opportunities
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(38px,5vw,68px)] font-black leading-[1.08] tracking-[-2px] mb-3">
          Building Digital<br />
          Products That<br />
          <span className="text-gradient">Drive Impact.</span>
        </h1>

        <p className="text-[15px] text-[#888] max-w-[440px] mb-9 leading-[1.7]">
          {resume.summary.substring(0, 160)}…
        </p>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <a href="#experience" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#080808] rounded-full font-bold text-sm hover:bg-[#e0e7ff] hover:-translate-y-0.5 transition-all">
            View My Work ↗
          </a>
          <a href={`mailto:${resume.email}`} className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-white rounded-full font-semibold text-sm hover:border-white/50 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all">
            Let's Talk 💬
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/[0.07]">
          {resume.stats.map(s => <Stat key={s.label} {...s} />)}
        </div>
      </div>

      {/* Right — photo */}
      <div className="relative z-10 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-[420px]">
          <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.07]" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
            <img
              src={photo}
              alt="Anna Abadi"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Floating badge — top right */}
          <div className="absolute top-5 -right-5 flex items-center gap-2.5 bg-[#111]/95 backdrop-blur-md border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm font-semibold animate-[float_4s_ease-in-out_infinite]">
            <span className="text-lg">⚛️</span>
            <div>
              <div className="text-white text-[13px]">React.js Expert</div>
              <div className="text-[#888] text-[11px] font-normal">TypeScript · Tailwind</div>
            </div>
          </div>

          {/* Floating badge — bottom left */}
          <div className="absolute bottom-5 -left-5 flex items-center gap-2.5 bg-[#111]/95 backdrop-blur-md border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm font-semibold animate-[float_4s_ease-in-out_1.5s_infinite]">
            <span className="text-lg">🚀</span>
            <div>
              <div className="text-white text-[13px]">Open Work Permit</div>
              <div className="text-[#888] text-[11px] font-normal">Based in Vancouver, BC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
