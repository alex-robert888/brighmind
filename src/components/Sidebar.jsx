import { Home, BookOpen, BarChart2, Trophy } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  // Get current path to determine active link
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-4 flex items-center gap-2">
        <div className="bg-black rounded-full p-1.5">
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </div>
        <span className="font-semibold text-lg">Brightminds</span>
      </div>

      <nav className="mt-6">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-4 py-3 rounded-l-full ${
                currentPath === '/' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/course" 
              className={`flex items-center gap-3 px-4 py-3 rounded-l-full ${
                currentPath === '/course' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={18} />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/quiz" 
              className={`flex items-center gap-3 px-4 py-3 rounded-l-full ${
                currentPath === '/quiz' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart2 size={18} />
              <span>Assessments</span>
            </Link>
          </li>
          <li>
            <a 
              href="#badges" 
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-l-full"
            >
              <Trophy size={18} />
              <span>Badges</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar