"use client";
import { useEffect, useState } from 'react';
import questions from '../../../lib/questions.json';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('results') || '[]');
    setResults(storedResults);

    let calculatedScore = 0;
    storedResults.forEach((result, index) => {
      if (result !== undefined && questions[index]) {
      if (result === questions[index].correct) {
        calculatedScore += 1;
      } else if (result === null) {
        calculatedScore -= 1;
      }
      }
    });
    setScore(calculatedScore);
  }, []);

  return (
    <div>
      <h1>Results</h1>
      <p>Your Score: {score}</p>
      <div>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <p>{question.question}</p>
            {question.options.map((option, optionIndex) => {
              let backgroundColor = 'grey';
              if (results[index] === optionIndex) {
                backgroundColor = optionIndex === question.correct ? 'green' : 'red';
              } else if (optionIndex === question.correct) {
                backgroundColor = 'green';
              }
              return (
                <div key={optionIndex} style={{ backgroundColor, padding: '4px', borderRadius: '4px' }}>
                  {option}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
