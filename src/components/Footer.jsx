import { resume } from '../data/resume'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.07] px-[5%] py-7 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs text-white" style={{ background: 'linear-gradient(135deg, #5b7fff, #a78bfa)' }}>
          AA
        </div>
        <span className="text-[14px] font-bold text-white">{resume.name}</span>
      </div>

      <span className="text-[13px] text-[#888]">© 2026 Anna Abadi. All rights reserved.</span>

      <div className="flex gap-6">
        <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#888] font-medium hover:text-white transition-colors">LinkedIn</a>
        <a href={resume.github} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#888] font-medium hover:text-white transition-colors">GitHub</a>
        <a href={`mailto:${resume.email}`} className="text-[13px] text-[#888] font-medium hover:text-white transition-colors">Email me</a>
      </div>
    </footer>
  )
}
