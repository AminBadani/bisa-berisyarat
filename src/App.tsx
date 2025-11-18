function App() {
  return (
    <>
      <nav className='bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation"'>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h3>BisaBerisyarat</h3>
            <ul className="flex items-center gap-6">
              <li><a href="#">Belajar</a></li>
              <li><a href="#">Kuis</a></li>
              <li><a href="#">Perkembangan</a></li>
            </ul>
            <select name="indonesia" id="indonesia">
              <option value="indonesia">Indonesia</option>
              <option value="english">English</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  )
}

export default App
