import { resume } from '../data/resume'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-[5%] bg-[#111]">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-14">
        <div>
          <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#5b7fff] mb-4">What I Do</span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-white leading-tight">
            End-to-End Front-End<br />Solutions for Every Need
          </h2>
        </div>
        <p className="text-[15px] text-[#888] leading-[1.7]">
          From concept to pixel-perfect execution, I deliver user-centred interfaces that solve real problems — with performance and scalability at the core.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {resume.skills.map((s) => (
          <div key={s.title} className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-7 hover:border-[#5b7fff] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(91,127,255,0.12)] transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/[0.07] flex items-center justify-center text-[22px] mb-5">
              {s.icon}
            </div>
            <h3 className="text-[15px] font-bold text-white mb-2">{s.title}</h3>
            <p className="text-[13px] text-[#888] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="mt-14">
        <h3 className="text-[12px] font-bold tracking-[2px] uppercase text-[#888] mb-5">Tools &amp; Technologies</h3>
        <div className="flex flex-wrap gap-2.5">
          {resume.techStack.map(t => (
            <span key={t} className="px-4 py-1.5 bg-[#181818] border border-white/[0.07] rounded-full text-[13px] font-medium text-[#ccc] hover:border-[#5b7fff] hover:text-[#5b7fff] transition-colors cursor-default">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
