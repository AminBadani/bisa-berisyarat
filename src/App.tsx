import { HashRouter, Navigate, Route, Routes } from 'react-router'

import Navbar from './components/Navbar'
import Belajar from './pages/belajar'
import Kuis from './pages/kuis'
import Perkembangan from './pages/perkembangan'

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/belajar" replace />} />
          <Route path="/belajar" element={<Belajar />} />
          <Route path="/kuis" element={<Kuis />} />
          <Route path="/perkembangan" element={<Perkembangan />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
