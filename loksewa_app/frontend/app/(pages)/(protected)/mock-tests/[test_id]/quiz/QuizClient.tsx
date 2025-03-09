"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../../components/Navbar';
import { FiClock } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import questions from '../../../../../lib/questions.json'; // Import questions from JSON file

interface Question {
  question: string;
  options: string[];
}

export default function QuizClient() {
  const { test_id } = useParams<{ test_id: string }>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    } else if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  if (!currentQuestionData) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mock Test #{test_id}</h1>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow">
            <FiClock className="text-blue-600 text-xl" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => (
                <button
                  key={index}
                  aria-label={`Go to question ${index + 1}`}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${index === currentQuestion 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Display */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">{currentQuestionData.question}</h2>
            <div className="space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigateQuestion('prev')}
                disabled={currentQuestion === 0}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                <IoIosArrowBack className="mr-2" /> Previous
              </button>
              <button
                onClick={() => navigateQuestion('next')}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next <IoIosArrowForward className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}