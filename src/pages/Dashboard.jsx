import { Award, BookOpen, CheckCircle, Clock, FileText, Heart } from "lucide-react" 
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toggleFavourite } from '../store/courses-slice'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const Dashboard = () => {
  const courses = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Favorite and recommended courses
  const favoriteCourses = courses.filter(course => course.addedToFavourites);
  
  // Stats data
  const stats = {
    totalEnrolled: courses.length,
    completed: Math.round(courses.length * 0.6),
    quizScore: 80
  };

  const handleToggleFavorite = (courseId) => {
    dispatch(toggleFavourite(courseId));
  };

  const navigateToCourse = (id) => {
    navigate('/course', { state: { courseId: id } });
  };

  const navigateToQuiz = () => {
    navigate('/quiz');
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Use the Header component */}
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto">
              {/* Welcome Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center text-gray-600 font-bold">J</div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Welcome Back Jack</h1>
                  <p className="text-sm text-gray-500">Here is an overview of your progress</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Total Enrolled</h3>
                    <div className="bg-gray-900 p-1 rounded">
                      <BookOpen size={16} className="text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold">{stats.totalEnrolled}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                    <div className="bg-gray-900 p-1 rounded">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold">{stats.completed}/{stats.totalEnrolled}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-500">Quiz Score</h3>
                    <div className="bg-gray-900 p-1 rounded">
                      <FileText size={16} className="text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold">{stats.quizScore}%</p>
                  <button 
                    onClick={navigateToQuiz}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Take new quiz
                  </button>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Your Courses</h2>
                  <Link to="/course" className="text-sm text-blue-600 hover:underline">View All</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="bg-gray-100 p-2 rounded">
                          <BookOpen size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{course.title}</h3>
                            <button 
                              onClick={() => handleToggleFavorite(course.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Heart 
                                size={18} 
                                fill={course.addedToFavourites ? "red" : "none"} 
                                color={course.addedToFavourites ? "red" : "currentColor"}
                              />
                            </button>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{course.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">7/10</span>
                          </div>
                          <button 
                            onClick={() => navigateToCourse(course.id)}
                            className="mt-3 text-sm text-blue-600 hover:underline"
                          >
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredCourses.length === 0 && (
                    <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm text-center">
                      <p className="text-gray-500">No courses found matching "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Favorite Courses */}
              {favoriteCourses.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Favorite Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteCourses.map(course => (
                      <div key={`fav-${course.id}`} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-400">
                        <div className="flex items-start gap-3">
                          <div className="bg-red-50 p-2 rounded">
                            <Heart size={20} className="text-red-500" fill="red" />
                          </div>
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <p className="text-xs text-gray-600 mt-1">{course.description}</p>
                            <button 
                              onClick={() => navigateToCourse(course.id)}
                              className="mt-2 text-xs text-blue-600 hover:underline"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Badges */}
              <div id="badges">
                <h2 className="text-lg font-semibold mb-4">Recent Badges</h2>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <Award size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Learn Figma The UI Design Essentials</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>2:30hr</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>14 Lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText size={14} />
                            <span>Assignment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <Award size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Ethical Hacking and Penetration Testing</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>2:30hr</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>14 Lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText size={14} />
                            <span>Assignment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboard