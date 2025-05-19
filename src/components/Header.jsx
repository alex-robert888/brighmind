import { Link } from 'react-router-dom'

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  showSearch = true,
  title = null 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        {title && <h1 className='text-xl font-semibold mr-4'>{title}</h1>}
        {/* <a href="#" className="text-gray-600 hover:text-gray-900">
          Help
        </a> */}
      </div>
      <div className="flex gap-3 items-center">
        {showSearch && (
          <input
            type="text"
            placeholder="Search courses..."
            className="px-3 py-1 border rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm">Log Out</button>
      </div>
    </header>
  )
}

export default Header