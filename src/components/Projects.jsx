import { resume } from '../data/resume'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-[5%] bg-[#111]">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#5b7fff] mb-4">Featured Work</span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-white leading-tight">Products I've Shaped</h2>
        </div>
        <a href={`mailto:${resume.email}`} className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white rounded-full font-semibold text-[13px] hover:border-white/50 hover:bg-white/[0.04] transition-all whitespace-nowrap">
          Get in Touch ↗
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {resume.projects.map((p) => (
          <div key={p.title} className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#5b7fff]/40 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(91,127,255,0.1)] transition-all duration-300 cursor-default">
            {/* Thumb */}
            <div className={`aspect-video bg-gradient-to-br ${p.gradient} flex items-center justify-center text-4xl relative overflow-hidden`}>
              {p.emoji}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                <span className="text-[11px] font-bold text-white/60 tracking-widest uppercase">{p.tag}</span>
              </div>
            </div>
            {/* Info */}
            <div className="p-5 pb-6">
              <h3 className="text-[15px] font-bold text-white mb-1.5">{p.title}</h3>
              <p className="text-[13px] text-[#888] leading-relaxed mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.pills.map(t => (
                  <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#181818] border border-white/[0.07] text-[#888]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
