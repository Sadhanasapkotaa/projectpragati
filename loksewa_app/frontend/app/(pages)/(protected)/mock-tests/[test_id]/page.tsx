"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';

const mockTests = [
  { id: 1, title: "Loksewa 2081 Mock Test" },
  { id: 2, title: "Loksewa 2080 Mock Test" },
  { id: 3, title: "Loksewa 2079 Mock Test" },
  { id: 4, title: "Loksewa 2078 Mock Test" },
];

export default function MockTestDetailPage() {
  const { test_id } = useParams();
  const router = useRouter();
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (test_id) {
      const foundTest = mockTests.find((test) => test.id === parseInt(test_id));
      setTest(foundTest);
    }
  }, [test_id]);

  if (!test) {
    return <div>Mock Test not found</div>;
  }

  const handleStartNow = () => {
    router.push(`/mock-tests/${test_id}/quiz`);
  };

  return (
    <div>
      <Navbar />
      <h1>{test.title}</h1>
      {/* Add exam details here */}
      <p>Exam details go here...</p>
      <button onClick={handleStartNow}>Start Now</button>
    </div>
  );
}
