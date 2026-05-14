import { resume } from '../data/resume'

const techIcons = [
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
  { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg', color: '#764ABC' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
  { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg', color: '#007FFF' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#E34F26' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', color: '#1572B6' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#339933' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', color: '#ffffff' },
  { name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg', color: '#C21325' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', color: '#F24E1E' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', color: '#4479A1' },
  { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg', color: '#0052CC' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg', color: '#646CFF' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-[5%] bg-[#111]">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
        {resume.skills.map((s) => (
          <div key={s.title} className="bg-[#0f0f0f] border border-white/[0.07] rounded-2xl p-7 hover:border-[#5b7fff] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(91,127,255,0.12)] transition-all duration-300 cursor-default">
            <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/[0.07] flex items-center justify-center text-[22px] mb-5">{s.icon}</div>
            <h3 className="text-[15px] font-bold text-white mb-2">{s.title}</h3>
            <p className="text-[13px] text-[#888] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-[#888] mb-6">Tools &amp; Technologies</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {techIcons.map((t) => (
            <div key={t.name} className="group flex flex-col items-center gap-2.5 bg-[#0f0f0f] border border-white/[0.07] rounded-xl p-3 hover:border-white/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: t.color + '18' }}>
                <img src={t.icon} alt={t.name} className="w-6 h-6 object-contain" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
              </div>
              <span className="text-[10px] font-medium text-[#666] group-hover:text-[#999] transition-colors text-center leading-tight">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
