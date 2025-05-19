import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Course = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          title="Course Page"
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className='text-blue-600'>COURSE CONTENT</h1>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Course