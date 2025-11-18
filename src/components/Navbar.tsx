function Navbar() {
  return (
    <nav className='bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation"'>

      <div className="container mx-auto px-4 py-4">
        
        <div className="flex justify-between items-center">
          
          <h3 className="text-white font-bold">BisaBerisyarat</h3>
          
          <ul className="flex items-center gap-6">
            <li className="transition-all hover:scale-110 text-white bg-white/30 px-4 py-2 rounded-full"><a href="#">Belajar</a></li>
            <li className="transition-all hover:scale-110  text-white/90 hover:text-white px-4 py-2"><a href="#">Kuis</a></li>
            <li className="transition-all hover:scale-110 text-white/90 hover:text-white px-4 py-2"><a href="#">Perkembangan</a></li>
          </ul>
          
          <select name="bahasa" id="bahasa" className="text-white px-2 py-1 border bg-orange">
            <option value="indonesia">Indonesia</option>
            <option value="english">English</option>
          </select>

        </div>

      </div>

    </nav>
  )
}

export default Navbar;