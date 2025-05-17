
import { useState, useEffect } from "react"
import { Clock, ArrowLeft, HelpCircle, ArrowRight, LogOut } from "lucide-react"
import { cn } from "../lib/utils"

// Quiz data
const quizData = {
  title: "Child and Adolescent Psychology: Growing Minds",
  chapter: "Chapter #5 Quiz",
  totalQuestions: 10,
  currentQuestion: {
    id: 7,
    text: "Which of the following is NOT a major social influence on adolescent development?",
    options: [
      { id: "A", text: "Family dynamics" },
      { id: "B", text: "Peer relationships" },
      { id: "C", text: "Cultural expectations" },
      { id: "D", text: "Individual genetic makeup" },
    ],
    correctAnswer: "D",
  },
  questions: [
    { id: 1, status: "correct" },
    { id: 2, status: "correct" },
    { id: 3, status: "incorrect" },
    { id: 4, status: "correct" },
    { id: 5, status: "incorrect" },
    { id: 6, status: "correct" },
    { id: 7, status: "current" },
    { id: 8, status: "unattempted" },
    { id: 9, status: "unattempted" },
    { id: 10, status: "unattempted" },
  ],
}

export default function Quiz() {
  const [timeLeft, setTimeLeft] = useState(225) // 3:45 in seconds
  const [selectedOption, setSelectedOption] = useState(null)

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Handle option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
  }

  // Get status color for question navigation
  const getStatusColor = (status) => {
    switch (status) {
      case "correct":
        return "bg-green-200 text-green-800"
      case "incorrect":
        return "bg-red-200 text-red-800"
      case "current":
        return "bg-white border-2 border-blue-500 text-blue-800"
      default:
        return "bg-white text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 border-b">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
            <h1 className="text-xl md:text-2xl font-bold hidden md:block">{quizData.title}</h1>
            <div className="md:hidden" />
          </div>
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              Back to Course
            </button>
            <h1 className="text-xl font-bold md:hidden">{quizData.title}</h1>
          </div>
          <h2 className="text-lg font-semibold">{quizData.chapter}</h2>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Question navigation sidebar */}
        <div className="w-48 border-r bg-gray-50 flex flex-col">
          <div className="p-3 flex items-center gap-2 border-b">
            <Clock size={16} className="text-gray-600" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex flex-col p-2 gap-2 overflow-y-auto">
            {quizData.questions.map((question) => (
              <button
                key={question.id}
                className={cn("py-2 text-center rounded-md border", getStatusColor(question.status))}
              >
                Question {question.id}
              </button>
            ))}
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 flex flex-col bg-blue-50">
          <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Question {quizData.currentQuestion.id} / {quizData.totalQuestions}
              </h3>
              <button className="flex items-center gap-1 text-gray-600">
                <span>Hint</span>
                <HelpCircle size={16} />
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-lg mb-6">{quizData.currentQuestion.text}</p>

              <div className="space-y-3">
                {quizData.currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-full border transition-colors",
                      selectedOption === option.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300",
                    )}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <span className="font-medium mr-2">{option.id})</span>
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer navigation */}
          <div className="border-t bg-white p-3 flex justify-between">
            <button className="flex items-center gap-1 text-gray-700">
              <LogOut size={16} />
              <span>Exit Quiz</span>
            </button>
            <button className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-md">
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}