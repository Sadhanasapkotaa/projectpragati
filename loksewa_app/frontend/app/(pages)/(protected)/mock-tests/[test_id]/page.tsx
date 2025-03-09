// No "use client" directive here - this is a server component
import MockTestClient from './MockTestClient';

// Mock tests data for static generation
const mockTests = [
  { id: 1, title: "Loksewa 2081 Mock Test" },
  { id: 2, title: "Loksewa 2080 Mock Test" },
  { id: 3, title: "Loksewa 2079 Mock Test" },
  { id: 4, title: "Loksewa 2078 Mock Test" },
];

export function generateStaticParams() {
  return mockTests.map(test => ({
    test_id: test.id.toString()
  }));
}

export default function MockTestDetailPage() {
  return <MockTestClient />;
}