import Image from "next/image";
import { FaCheckCircle, FaBook, FaQuestionCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--primary-color)' }}>
        Pragati Loksewa Preparation App
      </h1>
      <p className="text-center text-lg mb-2" style={{ color: 'var(--foreground)' }}>Coming Soon!</p>
      <p className="text-center text-lg mb-4" style={{ color: 'var(--foreground)' }}>
        Prepare for Loksewa exams with our app that offers:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="flex items-center">
          <FaCheckCircle className="mr-2" style={{ color: 'var(--primary-color)' }} />Quizzes
        </li>
        <li className="flex items-center">
          <FaBook className="mr-2" style={{ color: 'var(--primary-color)' }} />Model questions
        </li>
        <li className="flex items-center">
          <FaQuestionCircle className="mr-2" style={{ color: 'var(--primary-color)' }} />20 past questions with one free trial
        </li>
      </ul>
      <p className="text-center text-lg" style={{ color: 'var(--foreground)' }}>Stay tuned for more updates.</p>
    </div>
  );
}
