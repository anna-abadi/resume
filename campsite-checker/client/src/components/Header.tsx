import { Tent } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-forest-800 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="bg-forest-600 rounded-xl p-2">
          <Tent className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">CampWatch</h1>
          <p className="text-forest-300 text-xs">Catch cancellations before they're gone</p>
        </div>
      </div>
    </header>
  )
}
