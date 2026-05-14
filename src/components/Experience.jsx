import { resume } from '../data/resume'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-[5%] bg-[#080808]">
      <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#5b7fff] mb-4">Work Experience</span>
      <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-white leading-tight mb-14">
        Where I've Made an Impact
      </h2>

      <div className="flex flex-col divide-y divide-white/[0.07]">
        {resume.experience.map((exp) => (
          <div key={exp.company} className="group grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-10 first:border-t first:border-white/[0.07]">
            {/* Meta */}
            <div className="flex md:flex-col gap-4 md:gap-1">
              <div className="text-[13px] text-[#888] font-medium">{exp.period}</div>
              <div className="text-[12px] text-[#444]">{exp.location}</div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="text-[18px] font-extrabold text-white">{exp.company}</div>
                  <div className="text-[14px] text-[#5b7fff] font-semibold mt-1">{exp.role}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/[0.07] flex items-center justify-center text-[14px] text-[#888] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1">
                  ↗
                </div>
              </div>
              <p className="text-[14px] text-[#666] leading-relaxed mb-4">{exp.desc}</p>
              <ul className="flex flex-col gap-2">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-[13px] text-[#888] leading-relaxed">
                    <span className="text-[#5b7fff] shrink-0 text-[12px] mt-0.5">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
