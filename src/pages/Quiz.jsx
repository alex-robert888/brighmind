"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  LogOut,
  CheckCircle,
  XCircle,
  Award,
  AlertTriangle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "../lib/utils"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

// Quiz data
const quizData = {
  title: "Child and Adolescent Psychology: Growing Minds",
  chapter: "Chapter #5 Quiz",
  totalQuestions: 10,
  questions: [
    {
      id: 1,
      text: "Which developmental theory emphasizes the role of social interaction in cognitive development?",
      options: [
        { id: "A", text: "Piaget's Theory" },
        { id: "B", text: "Vygotsky's Sociocultural Theory" },
        { id: "C", text: "Freud's Psychosexual Theory" },
        { id: "D", text: "Erikson's Psychosocial Theory" },
      ],
      correctAnswer: "B",
      hint: "This theory focuses on how culture and social interactions shape cognitive development.",
    },
    {
      id: 2,
      text: "What is the term for the ability to understand that objects continue to exist even when they cannot be seen?",
      options: [
        { id: "A", text: "Object permanence" },
        { id: "B", text: "Conservation" },
        { id: "C", text: "Egocentrism" },
        { id: "D", text: "Accommodation" },
      ],
      correctAnswer: "A",
      hint: "This concept is typically developed during the sensorimotor stage of development.",
    },
    {
      id: 3,
      text: "During which of Piaget's stages do children begin to think logically about concrete events?",
      options: [
        { id: "A", text: "Sensorimotor stage" },
        { id: "B", text: "Preoperational stage" },
        { id: "C", text: "Concrete operational stage" },
        { id: "D", text: "Formal operational stage" },
      ],
      correctAnswer: "C",
      hint: "The name of this stage directly relates to the ability to think logically about concrete events.",
    },
    {
      id: 4,
      text: "Which of the following is a characteristic of authoritative parenting?",
      options: [
        { id: "A", text: "High demands with low responsiveness" },
        { id: "B", text: "Low demands with high responsiveness" },
        { id: "C", text: "High demands with high responsiveness" },
        { id: "D", text: "Low demands with low responsiveness" },
      ],
      correctAnswer: "C",
      hint: "This parenting style balances clear expectations with emotional support.",
    },
    {
      id: 5,
      text: "What term describes the rapid growth of connections between neurons in early childhood?",
      options: [
        { id: "A", text: "Pruning" },
        { id: "B", text: "Synaptogenesis" },
        { id: "C", text: "Myelination" },
        { id: "D", text: "Lateralization" },
      ],
      correctAnswer: "B",
      hint: "The term contains 'synapse' which refers to the connection between neurons.",
    },
    {
      id: 6,
      text: "Which of the following is NOT a stage in Kohlberg's theory of moral development?",
      options: [
        { id: "A", text: "Preconventional morality" },
        { id: "B", text: "Conventional morality" },
        { id: "C", text: "Postconventional morality" },
        { id: "D", text: "Transcendental morality" },
      ],
      correctAnswer: "D",
      hint: "Three of these are legitimate stages in Kohlberg's theory, but one is not part of his framework.",
    },
    {
      id: 7,
      text: "Which of the following is NOT a major social influence on adolescent development?",
      options: [
        { id: "A", text: "Family dynamics" },
        { id: "B", text: "Peer relationships" },
        { id: "C", text: "Cultural expectations" },
        { id: "D", text: "Individual genetic makeup" },
      ],
      correctAnswer: "D",
      hint: "Three options are social influences, but one is biological rather than social.",
    },
    {
      id: 8,
      text: "What is the term for the heightened self-consciousness that adolescents often experience?",
      options: [
        { id: "A", text: "Personal fable" },
        { id: "B", text: "Imaginary audience" },
        { id: "C", text: "Identity diffusion" },
        { id: "D", text: "Formal operations" },
      ],
      correctAnswer: "B",
      hint: "This concept refers to adolescents' belief that others are constantly observing and evaluating them.",
    },
    {
      id: 9,
      text: "According to Erikson, what is the primary psychosocial crisis of adolescence?",
      options: [
        { id: "A", text: "Trust vs. Mistrust" },
        { id: "B", text: "Industry vs. Inferiority" },
        { id: "C", text: "Identity vs. Role Confusion" },
        { id: "D", text: "Intimacy vs. Isolation" },
      ],
      correctAnswer: "C",
      hint: "This crisis involves figuring out 'who you are' as a person.",
    },
    {
      id: 10,
      text: "Which brain region, responsible for planning and decision-making, continues to develop throughout adolescence?",
      options: [
        { id: "A", text: "Cerebellum" },
        { id: "B", text: "Prefrontal cortex" },
        { id: "C", text: "Amygdala" },
        { id: "D", text: "Hippocampus" },
      ],
      correctAnswer: "B",
      hint: "This region is located in the front of the brain and is associated with executive functions.",
    },
  ],
}

export default function QuizInterface() {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [currentQuestionId, setCurrentQuestionId] = useState(1) // Start with question 1
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submittedAnswers, setSubmittedAnswers] = useState({})
  const [showHint, setShowHint] = useState(false)
  const [usedHints, setUsedHints] = useState({}) // Track which questions used hints
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewQuestionId, setReviewQuestionId] = useState(1)

  // Get current question
  const currentQuestion = quizData.questions.find((q) => q.id === currentQuestionId)
  const reviewQuestion = quizData.questions.find((q) => q.id === reviewQuestionId)

  // Navigation handlers
  const navigateToDashboard = () => {
    navigate("/")
  }

  const navigateToCourse = () => {
    navigate("/course")
  }

  // Timer functionality - stop timer when quiz is completed
  useEffect(() => {
    // Only run the timer if the quiz is not completed
    if (quizCompleted) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          // Auto-submit quiz when time runs out
          if (!quizCompleted) {
            setQuizCompleted(true)
          }
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizCompleted])

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Handle option selection
  const handleOptionSelect = (optionId) => {
    // Only allow selection if this question hasn't been submitted yet
    if (!submittedAnswers[currentQuestionId]) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionId]: optionId,
      })
    }
  }

  // Navigate to a specific question
  const navigateToQuestion = (questionId) => {
    if (!quizCompleted) {
      setCurrentQuestionId(questionId)
      setShowHint(false) // Hide hint when changing questions
    }
  }

  // Navigate to next question and submit the current answer
  const navigateToNextQuestion = () => {
    // Submit the current answer if one is selected and not already submitted
    if (selectedAnswers[currentQuestionId] && !submittedAnswers[currentQuestionId]) {
      setSubmittedAnswers({
        ...submittedAnswers,
        [currentQuestionId]: selectedAnswers[currentQuestionId],
      })
    }

    // Check if this was the last question
    if (currentQuestionId === quizData.totalQuestions) {
      setQuizCompleted(true)
    } else {
      // Navigate to next question
      setCurrentQuestionId(currentQuestionId + 1)
      setShowHint(false) // Hide hint when changing questions
    }
  }

  // Toggle hint visibility
  const toggleHint = () => {
    if (!showHint && !usedHints[currentQuestionId]) {
      // Mark this question as having used a hint
      setUsedHints({
        ...usedHints,
        [currentQuestionId]: true,
      })
    }
    setShowHint(!showHint)
  }

  // Get question status
  const getQuestionStatus = (questionId) => {
    const submittedAnswer = submittedAnswers[questionId]
    const correctAnswer = quizData.questions.find((q) => q.id === questionId)?.correctAnswer

    if (!submittedAnswer) {
      return currentQuestionId === questionId ? "current" : "unattempted"
    }

    return submittedAnswer === correctAnswer ? "correct" : "incorrect"
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

  // Check if current question has been answered
  const isCurrentQuestionAnswered = !!submittedAnswers[currentQuestionId]

  // Calculate final score
  const calculateScore = () => {
    let correctCount = 0
    let hintPenalty = 0

    quizData.questions.forEach((question) => {
      const userAnswer = submittedAnswers[question.id]
      const usedHint = usedHints[question.id]

      if (userAnswer === question.correctAnswer) {
        correctCount++
        // Apply a small penalty for using hints (0.2 points per hint) ONLY if the answer was correct
        if (usedHint) {
          hintPenalty += 0.2
        }
      }
      // No penalty for hints on questions answered incorrectly
    })

    // Calculate raw score out of 10
    const rawScore = correctCount
    // Apply hint penalty
    const finalScore = Math.max(0, rawScore - hintPenalty)
    // Round to 1 decimal place
    return Math.round(finalScore * 10) / 10
  }

  // Check if quiz is passed (score > 5)
  const isPassed = () => {
    return calculateScore() > 5
  }

  // Count answered questions
  const answeredCount = Object.keys(submittedAnswers).length

  // Count correct answers
  const correctCount = quizData.questions.reduce((count, question) => {
    return submittedAnswers[question.id] === question.correctAnswer ? count + 1 : count
  }, 0)

  // Count hint usage
  const hintCount = Object.keys(usedHints).length

  // Enter review mode
  const enterReviewMode = () => {
    setReviewMode(true)
    setReviewQuestionId(1)
  }

  // Exit review mode
  const exitReviewMode = () => {
    setReviewMode(false)
  }

  // Navigate to previous review question
  const goToPreviousReviewQuestion = () => {
    if (reviewQuestionId > 1) {
      setReviewQuestionId(reviewQuestionId - 1)
    }
  }

  // Navigate to next review question
  const goToNextReviewQuestion = () => {
    if (reviewQuestionId < quizData.totalQuestions) {
      setReviewQuestionId(reviewQuestionId + 1)
    }
  }

  // Navigate to specific review question
  const goToReviewQuestion = (questionId) => {
    setReviewQuestionId(questionId)
  }

  // Calculate hint penalty (only for correct answers)
  const calculateHintPenalty = () => {
    let penalty = 0

    quizData.questions.forEach((question) => {
      const userAnswer = submittedAnswers[question.id]
      const usedHint = usedHints[question.id]

      // Only count penalty for hints used on correctly answered questions
      if (userAnswer === question.correctAnswer && usedHint) {
        penalty += 0.2
      }
    })

    return penalty
  }

  // Render quiz completion screen
  const renderQuizCompletion = () => {
    const finalScore = calculateScore()
    const passed = isPassed()

    return (
      <div className="flex-1 flex flex-col bg-blue-50">
        <div className="p-6 flex-1">
          <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-gray-600">You have completed the Chapter #5 Quiz</p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full flex items-center justify-center border-8 border-gray-100">
                  <span className="text-4xl font-bold">{finalScore}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                  {passed ? (
                    <CheckCircle size={32} className="text-green-500" />
                  ) : (
                    <XCircle size={32} className="text-red-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-1">
                {passed ? (
                  <span className="text-green-600">Passed!</span>
                ) : (
                  <span className="text-red-600">Failed</span>
                )}
              </h3>
              <p className="text-gray-600">
                {passed
                  ? "Congratulations! You have passed the quiz."
                  : "You did not pass the quiz. You need a score greater than 5 to pass."}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>Correct Answers</span>
                </div>
                <span className="font-semibold">{correctCount} / 10</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <XCircle size={20} className="text-red-500" />
                  <span>Incorrect Answers</span>
                </div>
                <span className="font-semibold">{answeredCount - correctCount} / 10</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <HelpCircle size={20} className="text-yellow-500" />
                  <span>Hints Used</span>
                </div>
                <span className="font-semibold">{hintCount}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-orange-500" />
                  <span>Hint Penalty</span>
                </div>
                <span className="font-semibold">-{calculateHintPenalty().toFixed(1)}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-blue-500" />
                  <span className="font-semibold">Final Score</span>
                </div>
                <span className="font-bold text-lg">{finalScore} / 10</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                onClick={navigateToCourse}
              >
                <ArrowLeft size={16} />
                <span>Back to Course</span>
              </button>
              <button
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                onClick={enterReviewMode}
              >
                <span>Review Answers</span>
                <CheckCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render review mode
  const renderReviewMode = () => {
    const userAnswer = submittedAnswers[reviewQuestionId]
    const isCorrect = userAnswer === reviewQuestion.correctAnswer
    const usedHint = usedHints[reviewQuestionId]

    return (
      <div className="flex-1 flex flex-col bg-blue-50">
        <div className="bg-white p-3 border-b flex justify-between items-center">
          <button
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            onClick={exitReviewMode}
          >
            <ArrowLeft size={16} />
            <span>Back to Results</span>
          </button>
          <h3 className="font-medium">Review Mode</h3>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        <div className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">
                Question {reviewQuestionId} / {quizData.totalQuestions}
              </h3>
              {isCorrect ? (
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle size={14} />
                  Correct
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <XCircle size={14} />
                  Incorrect
                </span>
              )}
              {usedHint && (
                <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <HelpCircle size={14} />
                  Hint Used
                </span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
            <p className="text-lg mb-6">{reviewQuestion.text}</p>

            <div className="space-y-3">
              {reviewQuestion.options.map((option) => {
                const isUserAnswer = userAnswer === option.id
                const isCorrectAnswer = option.id === reviewQuestion.correctAnswer

                let optionClass = "w-full text-left px-4 py-3 rounded-full border"

                if (isCorrectAnswer) {
                  optionClass += " border-green-500 bg-green-50 text-green-800"
                } else if (isUserAnswer) {
                  optionClass += " border-red-500 bg-red-50 text-red-800"
                } else {
                  optionClass += " border-gray-300 opacity-70"
                }

                return (
                  <div key={option.id} className={optionClass}>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium mr-2">{option.id})</span>
                        {option.text}
                      </div>
                      {isCorrectAnswer && <CheckCircle size={20} className="text-green-600 flex-shrink-0" />}
                      {!isCorrectAnswer && isUserAnswer && <XCircle size={20} className="text-red-600 flex-shrink-0" />}
                    </div>
                  </div>
                )
              })}
            </div>

            {usedHint && (
              <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                <p className="flex items-start gap-2">
                  <HelpCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Hint used:</strong> {reviewQuestion.hint}
                    {userAnswer === reviewQuestion.correctAnswer && (
                      <span className="block mt-1 text-sm">
                        <AlertTriangle size={14} className="inline mr-1" />
                        Hint penalty applied (-0.2 points) because this question was answered correctly.
                      </span>
                    )}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={goToPreviousReviewQuestion}
              disabled={reviewQuestionId === 1}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="flex gap-1">
              {quizData.questions.map((question) => {
                const status = getQuestionStatus(question.id)
                return (
                  <button
                    key={question.id}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                      getStatusColor(status),
                      reviewQuestionId === question.id && "ring-2 ring-blue-500",
                    )}
                    onClick={() => goToReviewQuestion(question.id)}
                  >
                    {question.id}
                  </button>
                )
              })}
            </div>

            <button
              className="flex items-center gap-1 px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={goToNextReviewQuestion}
              disabled={reviewQuestionId === quizData.totalQuestions}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Replace the custom header with the shared Header */}
        <Header title={quizData.title} showSearch={false} />

        {/* Quiz-specific subheader */}
        <div className="bg-white p-3 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                onClick={navigateToDashboard}
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </button>
              <h2 className="text-lg font-semibold">{quizData.chapter}</h2>
            </div>
            <button
              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
              onClick={navigateToCourse}
            >
              Back to Course
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Question navigation sidebar - hide in review mode */}
          {!reviewMode && (
            <div className="w-48 border-r bg-gray-50 flex flex-col">
              <div className="p-3 flex items-center gap-2 border-b">
                <Clock size={16} className="text-gray-600" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex flex-col p-2 gap-2 overflow-y-auto">
                {quizData.questions.map((question) => {
                  const status = getQuestionStatus(question.id)
                  return (
                    <button
                      key={question.id}
                      className={cn("py-2 text-center rounded-md border transition-colors", getStatusColor(status))}
                      onClick={() => navigateToQuestion(question.id)}
                      disabled={quizCompleted}
                    >
                      Question {question.id}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Question content, completion screen, or review mode */}
          {quizCompleted ? (
            reviewMode ? (
              renderReviewMode()
            ) : (
              renderQuizCompletion()
            )
          ) : (
            <div className="flex-1 flex flex-col bg-blue-50">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Question {currentQuestionId} / {quizData.totalQuestions}
                  </h3>
                  <button
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={toggleHint}
                  >
                    <span>Hint</span>
                    <HelpCircle size={16} />
                  </button>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-lg mb-6">{currentQuestion.text}</p>

                  {/* Hint section */}
                  {showHint && (
                    <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                      <p className="flex items-start gap-2">
                        <HelpCircle size={18} className="mt-0.5 flex-shrink-0" />
                        <span>{currentQuestion.hint}</span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedAnswers[currentQuestionId] === option.id
                      const isSubmitted = isCurrentQuestionAnswered
                      const isCorrect = option.id === currentQuestion.correctAnswer

                      let optionClass = "w-full text-left px-4 py-3 rounded-full border transition-colors"

                      if (isSubmitted) {
                        // If answer is submitted, show correct/incorrect styling
                        if (isCorrect) {
                          optionClass += " border-green-500 bg-green-50 text-green-800"
                        } else if (isSelected) {
                          optionClass += " border-red-500 bg-red-50 text-red-800"
                        } else {
                          optionClass += " border-gray-300 opacity-70"
                        }
                      } else {
                        // If not submitted yet, just highlight selection
                        optionClass += isSelected
                          ? " border-blue-500 bg-blue-50"
                          : " border-gray-300 hover:border-blue-300"
                      }

                      return (
                        <button
                          key={option.id}
                          className={optionClass}
                          onClick={() => handleOptionSelect(option.id)}
                          disabled={isSubmitted}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium mr-2">{option.id})</span>
                              {option.text}
                            </div>
                            {isSubmitted && isCorrect && (
                              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                            )}
                            {isSubmitted && !isCorrect && isSelected && (
                              <XCircle size={20} className="text-red-600 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Footer navigation */}
              <div className="border-t bg-white p-3 flex justify-between">
                <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900" onClick={navigateToCourse}>
                  <LogOut size={16} />
                  <span>Exit Quiz</span>
                </button>
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-md",
                    selectedAnswers[currentQuestionId] && !submittedAnswers[currentQuestionId]
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : submittedAnswers[currentQuestionId]
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed",
                  )}
                  onClick={navigateToNextQuestion}
                  disabled={!selectedAnswers[currentQuestionId] && !submittedAnswers[currentQuestionId]}
                >
                  <span>
                    {isCurrentQuestionAnswered
                      ? currentQuestionId === quizData.totalQuestions
                        ? "Finish Quiz"
                        : "Next"
                      : "Submit"}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}