import { resume } from '../data/resume'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-[5%] bg-[#111] text-center">
      <div className="max-w-[680px] mx-auto bg-[#0f0f0f] border border-white/[0.07] rounded-3xl px-8 md:px-16 py-16 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(91,127,255,0.1) 0%, transparent 60%)' }} />

        <div className="relative z-10">
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight text-white mb-4 leading-tight">
            Let's build something<br />amazing together.
          </h2>
          <p className="text-[15px] text-[#888] mb-9 leading-[1.7] max-w-sm mx-auto">
            I'm always excited to work on meaningful products. Whether you have a full-time role, a freelance project, or just want to chat tech — my inbox is open.
          </p>
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#080808] rounded-full font-bold text-[15px] hover:bg-[#e0e7ff] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(91,127,255,0.3)] transition-all"
          >
            Start a Conversation ↗
          </a>
        </div>
      </div>
    </section>
  )
}
