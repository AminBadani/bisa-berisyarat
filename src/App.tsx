import { HashRouter, Navigate, Route, Routes } from 'react-router'

import Navbar from './components/Navbar'
import Learn from './pages/learn'
import Quiz from './pages/quiz'
import Progress from './pages/progress'

function App() {

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-100 to-blue-100">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/learn" replace />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
