"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { CheckCircle, Clock, FileText, Heart, ChevronLeft, Edit, Save, X, MessageSquare, Award } from "lucide-react"

const Course = ({ courseId = 1 }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeModule, setActiveModule] = useState(1)
  const [activeLesson, setActiveLesson] = useState(1)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState("")
  const [savedNotes, setSavedNotes] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock course data - in a real app, this would come from props or a data fetch
  const course = {
    id: 1,
    title: "Introduction to UI/UX Design",
    description: "Learn the fundamentals of user interface and experience design",
    addedToFavourites: isFavorite,
    modules: [
      {
        id: 1,
        title: "Getting Started with UI/UX",
        completed: true,
        lessons: [
          { id: 1, title: "Introduction to UI/UX Design", completed: true, duration: "10 min" },
          { id: 2, title: "Design Principles", completed: true, duration: "15 min" },
          { id: 3, title: "User Research Basics", completed: true, duration: "20 min" },
        ],
      },
      {
        id: 2,
        title: "Design Tools and Workflows",
        completed: false,
        lessons: [
          { id: 4, title: "Introduction to Figma", completed: true, duration: "25 min" },
          { id: 5, title: "Wireframing Techniques", completed: false, duration: "30 min" },
          { id: 6, title: "Prototyping in Figma", completed: false, duration: "35 min" },
        ],
      },
      {
        id: 3,
        title: "Advanced Concepts",
        completed: false,
        lessons: [
          { id: 7, title: "Accessibility in Design", completed: false, duration: "20 min" },
          { id: 8, title: "Design Systems", completed: false, duration: "25 min" },
          { id: 9, title: "User Testing", completed: false, duration: "30 min" },
        ],
      },
    ],
  }

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  // Find current lesson
  const currentModule = course.modules.find((m) => m.id === activeModule) || course.modules[0]
  const currentLesson = currentModule?.lessons.find((l) => l.id === activeLesson) || currentModule?.lessons[0]

  useEffect(() => {
    // Load saved notes from localStorage
    const savedNotesData = localStorage.getItem(`course_${course.id}_notes`)
    if (savedNotesData) {
      setSavedNotes(JSON.parse(savedNotesData))
    }

    // Set active lesson to first incomplete lesson if available
    for (const module of course.modules) {
      const incompleteLesson = module.lessons.find((lesson) => !lesson.completed)
      if (incompleteLesson) {
        setActiveModule(module.id)
        setActiveLesson(incompleteLesson.id)
        break
      }
    }
  }, [course.id])

  useEffect(() => {
    // Load notes for current lesson
    if (savedNotes[`lesson_${activeLesson}`]) {
      setNotes(savedNotes[`lesson_${activeLesson}`])
    } else {
      setNotes("")
    }
  }, [activeLesson, savedNotes])

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, you would dispatch to Redux or call an API
    // dispatch(toggleFavourite(course.id));
  }

  const handleSaveNotes = () => {
    const updatedNotes = {
      ...savedNotes,
      [`lesson_${activeLesson}`]: notes,
    }
    setSavedNotes(updatedNotes)
    localStorage.setItem(`course_${course.id}_notes`, JSON.stringify(updatedNotes))
    setIsEditing(false)
  }

  const handleLessonClick = (moduleId, lessonId) => {
    setActiveModule(moduleId)
    setActiveLesson(lessonId)
  }

  const handleBackToDashboard = () => {
    // In a real app, you would use navigation
    window.location.href = "/"
  }

  const handleTakeQuiz = () => {
    // In a real app, you would use navigation
    window.location.href = `/quiz?courseId=${course.id}`
  }

  const handleMarkAsCompleted = () => {
    // In a real app, you would update the course data in your state management
    alert("Lesson marked as completed!")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} title={course.title} />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Course Header */}
            <div className="mb-6">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Dashboard
              </button>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{course.title}</h1>
                  <p className="text-gray-600 mt-1">{course.description}</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button onClick={handleToggleFavorite} className="flex items-center gap-1 text-sm">
                    <Heart size={18} fill={isFavorite ? "red" : "none"} color={isFavorite ? "red" : "currentColor"} />
                    {isFavorite ? "Favorited" : "Add to Favorites"}
                  </button>
                  <button
                    onClick={handleTakeQuiz}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    Take Quiz
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {completedLessons}/{totalLessons} completed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Course Navigation */}
              <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-4 h-fit">
                <h2 className="font-semibold mb-4">Course Content</h2>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-sm">{module.title}</h3>
                        {module.completed ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <span className="text-xs text-gray-500">
                            {module.lessons.filter((l) => l.completed).length}/{module.lessons.length}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <button
                              onClick={() => handleLessonClick(module.id, lesson.id)}
                              className={`flex items-center justify-between w-full text-left text-sm p-2 rounded-md ${
                                activeLesson === lesson.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center">
                                {lesson.completed ? (
                                  <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                                ) : (
                                  <div className="w-3.5 h-3.5 border border-gray-300 rounded-full mr-2 flex-shrink-0"></div>
                                )}
                                <span className="truncate">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{lesson.duration}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Lesson Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{currentLesson?.title}</h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      {currentLesson?.duration}
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p>
                      This is the content for {currentLesson?.title}. In a real application, this would contain the
                      actual lesson content, which might include text, images, videos, and interactive elements.
                    </p>

                    <p className="mt-4">
                      The content would be structured to provide a clear learning path, with explanations, examples, and
                      possibly exercises or quizzes to reinforce learning.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-md mt-6">
                      <h3 className="text-lg font-medium mb-2">Key Takeaways</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Understanding the core principles of {currentLesson?.title}</li>
                        <li>How to apply these concepts in real-world scenarios</li>
                        <li>Best practices and common pitfalls to avoid</li>
                        <li>Resources for further learning and practice</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setShowNotes(!showNotes)}
                      className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      <MessageSquare size={16} className="mr-1" />
                      {showNotes ? "Hide Notes" : "Show Notes"}
                    </button>

                    <button
                      onClick={handleMarkAsCompleted}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                    >
                      Mark as Completed
                    </button>
                  </div>
                </div>

                {/* Notes Section */}
                {showNotes && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Your Notes</h2>
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveNotes}
                              className="flex items-center text-sm text-green-600 hover:text-green-700"
                            >
                              <Save size={16} className="mr-1" />
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                            >
                              <X size={16} className="mr-1" />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                          >
                            <Edit size={16} className="mr-1" />
                            Edit Notes
                          </button>
                        )}
                      </div>
                    </div>

                    {isEditing ? (
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Take notes on this lesson..."
                      />
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-md min-h-[10rem]">
                        {notes ? (
                          <p className="whitespace-pre-wrap">{notes}</p>
                        ) : (
                          <p className="text-gray-400 italic">No notes yet. Click 'Edit Notes' to add some.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Related Resources */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Related Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText size={20} className="text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Additional Reading</h3>
                          <p className="text-xs text-gray-600 mt-1">
                            Supplementary materials to enhance your understanding
                          </p>
                          <a href="#" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                            View Resource
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-50 p-2 rounded">
                          <Award size={20} className="text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Practice Exercise</h3>
                          <p className="text-xs text-gray-600 mt-1">
                            Apply what you've learned with hands-on exercises
                          </p>
                          <a href="#" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                            Start Exercise
                          </a>
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
  )
}

export default Course
