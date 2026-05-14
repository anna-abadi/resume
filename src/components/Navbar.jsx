import { useState, useEffect } from 'react'
import { resume } from '../data/resume'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = ['Skills', 'Experience', 'Projects', 'Education']

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-[5%] border-b border-white/[0.07] transition-all duration-300 ${scrolled ? 'bg-[#080808]/97 backdrop-blur-xl' : 'bg-[#080808]/85 backdrop-blur-xl'}`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-extrabold text-sm text-white" style={{ background: 'linear-gradient(135deg, #5b7fff, #a78bfa)' }}>
            AA
          </div>
          <div>
            <div className="font-bold text-[15px] text-white">{resume.name}</div>
            <div className="text-[11px] text-[#888]">{resume.title}</div>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-[14px] text-[#888] font-medium hover:text-white transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href={`mailto:${resume.email}`} className="hidden md:flex items-center gap-1.5 px-[22px] py-[9px] bg-white text-[#080808] rounded-full font-bold text-[13px] hover:bg-[#e0e7ff] transition-all hover:-translate-y-px">
          Let's Connect ↗
        </a>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-[5px] p-1" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span className={`w-[22px] h-[2px] bg-white rounded transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-[22px] h-[2px] bg-white rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[22px] h-[2px] bg-white rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-[#080808]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-white hover:text-[#5b7fff] transition-colors">
              {l}
            </a>
          ))}
          <a href={`mailto:${resume.email}`} onClick={() => setMenuOpen(false)} className="mt-4 px-8 py-3 bg-white text-[#080808] rounded-full font-bold text-base hover:bg-[#e0e7ff] transition-colors">
            Let's Connect ↗
          </a>
        </div>
      )}
    </>
  )
}
