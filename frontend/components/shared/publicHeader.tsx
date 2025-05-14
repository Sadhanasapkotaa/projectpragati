"use client";
import React from 'react'
import Image from "next/image";
import { useRouter } from "next/navigation";

const PublicHeader = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center mx-auto w-[80%] py-4">
      <div className="flex items-center">
        <Image src="/assets/svg/PragatiHeaderLogo.svg" 
          alt="Pragati Logo" 
          width={200}
          height={150}
        />
      </div>
      <button 
        onClick={() => router.push('/login')}
        className="px-8 py-2 border border-2 border-gray-500 rounded-full text-gray-700"
      >
        LOGIN
      </button>
    </header>
  );
};

export default PublicHeader;