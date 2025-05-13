"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      console.log('OTP submitted:', otpString);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/assets/svg/Background.svg"
        alt="Background Pattern"
        fill
        className="object-cover"
        priority
      />

      <div className="min-h-screen flex items-center justify-center relative">
        <div className="w-[80%] flex justify-left">
          <div className="rounded-3xl p-12 w-[550px] bg-white/95 backdrop-blur-sm">
            <div className="flex mb-16">
              <Image
                src="/assets/svg/PragatiHeaderLogo.svg"
                alt="Pragati Logo"
                width={180}
                height={60}
                priority
              />
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-purple-800 mb-2">Verify OTP</h1>
              <p className="text-gray-600">Please enter the 6-digit code sent to your email</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(element: HTMLInputElement | null) => {
                      inputRefs.current[index] = element;
                    }}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-gray-700"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
                disabled={otp.join('').length !== 6}
              >
                VERIFY
              </button>
            </form>

            <div className="mt-6 text-center">
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Resend Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;