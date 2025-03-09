"use client";

import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

const mockTests = [
  { id: 1, title: "Loksewa 2081 Mock Test", imageUrl: "https://images.unsplash.com/photo-1", tag: "Free" },
  { id: 2, title: "Loksewa 2080 Mock Test", imageUrl: "https://images.unsplash.com/photo-2", tag: "Free" },
  { id: 3, title: "Loksewa 2079 Mock Test", imageUrl: "https://images.unsplash.com/photo-3", tag: "Pro" },
  { id: 4, title: "Loksewa 2078 Mock Test", imageUrl: "https://images.unsplash.com/photo-4", tag: "Pro" },
];

export default function MockTestsPage() {
  return (
    <div>
      <Navbar />
      <h1>Mock Tests</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {mockTests.map((test) => (
          <div key={test.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', width: '200px' }}>
            <Image src={test.imageUrl} alt={test.title} width={200} height={120} style={{ borderRadius: '8px' }} />
            <h2>{test.title}</h2>
            <span style={{ backgroundColor: test.tag === "Free" ? 'green' : 'red', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
              {test.tag}
            </span>
            <Link href={`/mock-tests/${test.id}`} style={{ display: 'block', marginTop: '8px', color: 'blue' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
