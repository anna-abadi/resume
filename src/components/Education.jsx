import { resume } from '../data/resume'

export default function Education() {
  return (
    <section id="education" className="py-24 px-[5%] bg-[#080808]">
      <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#5b7fff] mb-4">Education</span>
      <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-white leading-tight mb-12">
        Academic Background
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
        {resume.education.map((e) => (
          <div key={e.degree} className="bg-[#111] border border-white/[0.07] rounded-2xl p-8 hover:border-[#5b7fff] hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="text-[32px] mb-5">{e.icon}</div>
            <div className="text-[18px] font-bold text-white mb-1.5">{e.degree}</div>
            <div className="text-[14px] text-[#5b7fff] font-semibold mb-2">{e.school}</div>
            <div className="text-[13px] text-[#888]">{e.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
