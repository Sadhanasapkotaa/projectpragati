import QuizClient from './QuizClient';

// Define the mock test IDs that should be pre-generated
export function generateStaticParams() {
  return [
    { test_id: '1' },
    { test_id: '2' },
    { test_id: '3' },
    { test_id: '4' },
  ];
}

export default function QuizPage() {
  return <QuizClient />;
}