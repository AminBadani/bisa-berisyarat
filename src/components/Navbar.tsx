import { Link, useLocation, useNavigate } from "react-router";
import { FaHandSparkles } from "react-icons/fa";
import { CiWarning } from "react-icons/ci"; 

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation()
  const menuItems = [
    { path: '/learn', label: 'Belajar' },
    { path: '/quiz', label: 'Kuis' },
    { path: '/progress', label: 'Perkembangan' },
  ];

  return (
    <nav className="bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">

      <div className="container mx-auto px-4 py-4">

        <div className="flex justify-between items-center">

          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
            aria-label="halaman-utama"
          >
            <div className="bg-white rounded-full p-2">
              <FaHandSparkles className="w-6 h-6 text-purple-600" aria-hidden="true" />
            </div>
            <span className="text-white">BisaBerisyarat</span>
          </Link>

          <div className="flex items-center gap-6">
            {
              menuItems.map((item) => {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`transition-all hover:scale-110 ${location.pathname === item.path
                        ? 'text-white bg-white/30 px-4 py-2 rounded-full'
                        : 'text-white/90 hover:text-white px-4 py-2'
                      }`}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })
            }
          </div>

          {/* <select name="bahasa" id="bahasa" className="text-white bg-white/30 px-4 py-2 rounded-full transition-all hover:scale-110 hover:cursor-pointer">
            <option value="indonesia">Indonesia</option>
            <option value="english">English</option>
          </select> */}

          <button
            className="bg-red-600 px-4 py-2 rounded-full text-white hover:scale-110 hover:cursor-pointer flex items-center gap-2"
            onClick={() => { window.api.clearFinished(); window.api.clearQuiz(); navigate('/') }}
          >
            <CiWarning className="w-7 h-7"/> Hapus progress
          </button>
        </div>

      </div>

    </nav>
  )
}

export default Navbar;