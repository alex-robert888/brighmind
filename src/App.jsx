import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from './pages/Quiz'
import Courses from './pages/Course'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
