export default function TrustedBar() {
  const companies = ['UOB', 'Aleph Labs', 'Uplifter Inc', 'SalamCinema', 'Sabk-e-zendegi']
  return (
    <div className="bg-[#111] border-t border-b border-white/[0.07] py-5 px-[5%] flex items-center gap-10 overflow-hidden">
      <span className="text-[12px] text-[#888] whitespace-nowrap shrink-0">Worked with</span>
      <div className="flex items-center gap-12 flex-wrap">
        {companies.map(c => (
          <span key={c} className="text-base font-bold text-[#333] tracking-wide whitespace-nowrap hover:text-[#666] transition-colors cursor-default">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
