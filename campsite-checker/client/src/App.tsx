import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import AlertForm from './components/AlertForm'
import AlertList from './components/AlertList'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 items-start">
        <AlertForm />
        <AlertList />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { borderRadius: '12px', fontSize: '14px' },
          success: { iconTheme: { primary: '#1c6742', secondary: '#fff' } },
        }}
      />
    </div>
  )
}
