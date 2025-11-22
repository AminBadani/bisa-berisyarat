import { HashRouter, Navigate, Route, Routes } from 'react-router'
import { useState } from 'react'
import { ModulContext } from './contexts/ModulContext'

import Navbar from './components/Navbar'
import Belajar from './pages/belajar'
import Kuis from './pages/kuis'
import Perkembangan from './pages/perkembangan'

import Modul from './models/Modul'

function App() {
  const [listModul, setListModul] = useState<Modul[]>([]);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100">
      <ModulContext.Provider value={{ listModul, setListModul }}>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/belajar" replace />} />
            <Route path="/belajar" element={<Belajar />} />
            <Route path="/kuis" element={<Kuis />} />
            <Route path="/perkembangan" element={<Perkembangan />} />
          </Routes>
        </HashRouter>
      </ModulContext.Provider>
    </div>
  )
}

export default App
