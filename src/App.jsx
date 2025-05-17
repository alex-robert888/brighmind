import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from './pages/Quiz'
import Course from './pages/Course'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/course" element={<Course />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
