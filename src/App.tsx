import { HashRouter, Route, Routes } from 'react-router'
import Belajar from './pages/belajar'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100">
      <Navbar />
      <HashRouter>
          <Routes>
            <Route path="/" element={ <Belajar /> } />
            <Route path="/kuis"  element={ <>Kuis</> } />
            <Route path="/perkembangan" element={ <>Perkembangan</> } />
          </Routes>
      </HashRouter>
    </div>
  )
}

export default App
