"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  coupon: string;
}

interface ValidationState {
  username: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
  coupon: boolean;
}

interface ErrorMessages {
  username: string;
  email: string;
  phone: string;
  password: string;
  coupon: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    coupon: ''
  });

  const [touched, setTouched] = useState<ValidationState>({
    username: false,
    email: false,
    phone: false,
    password: false,
    coupon: false
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    username: '',
    email: '',
    phone: '',
    password: '',
    coupon: ''
  });

  const [isValid, setIsValid] = useState<ValidationState>({
    username: false,
    email: false,
    phone: false,
    password: false,
    coupon: false
  });

  const validateField = (name: keyof FormData, value: string) => {
    let isFieldValid = false;
    let errorMessage = '';

    switch (name) {
      case 'username':
        isFieldValid = value.length >= 3;
        errorMessage = isFieldValid ? '' : 'Username must be at least 3 characters';
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isFieldValid = emailRegex.test(value);
        errorMessage = isFieldValid ? '' : 'Please enter a valid email address';
        break;
      
      case 'phone':
        const phoneRegex = /^\d{10}$/;
        isFieldValid = phoneRegex.test(value.replace(/\D/g, ''));
        errorMessage = isFieldValid ? '' : 'Please enter a valid 10-digit phone number';
        break;
      
      case 'password':
        isFieldValid = value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value);
        errorMessage = isFieldValid ? '' : 'Password must be at least 8 characters with 1 uppercase letter and 1 number';
        break;
      
      case 'coupon':
        isFieldValid = value === '' || value.length >= 5;
        errorMessage = isFieldValid ? '' : 'Invalid coupon code';
        break;
    }

    setIsValid(prev => ({ ...prev, [name]: isFieldValid }));
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allFields = ['username', 'email', 'phone', 'password'] as const;
    
    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      phone: true,
      password: true,
      coupon: true
    });

    // Validate all fields
    allFields.forEach(field => validateField(field, formData[field]));

    // Check if form is valid
    const isFormValid = allFields.every(field => isValid[field]);
    
    if (isFormValid) {
      // TODO: Submit form
      console.log('Form submitted:', formData);
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/assets/svg/CreateAccountBackground.svg"
        alt="Background Pattern"
        fill
        className="object-cover"
        priority
      />

      <div className="min-h-screen flex items-center justify-center relative">
        <div className="w-[80%] flex justify-left">
          {/* Registration Form Card */}
          <div className="rounded-3xl p-12 w-[550px] bg-white/95 backdrop-blur-sm ">
            {/* Logo */}
            <div className="flex mb-16">
              <Image
                src="/assets/svg/PragatiHeaderLogo.svg"
                alt="Pragati Logo"
                width={180}
                height={60}
                priority
              />
            </div>

            <div className=" mb-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-2">Welcome to Pragati!</h1>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
                <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.username && !isValid.username ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="username" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                Enter Username
                </label>
                <span className={`absolute right-3 top-3 ${isValid.username ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.username && errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
            </div>

            <div className="relative">
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.email && !isValid.email ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="email" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                E-mail
                </label>
                <span className={`absolute right-3 top-3 ${isValid.email ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
            </div>

            <div className="relative">
                <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.phone && !isValid.phone ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="phone" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                Phone Number
                </label>
                <span className={`absolute right-3 top-3 ${isValid.phone ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.phone && errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
            </div>

            <div className="relative">
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.password && !isValid.password ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="password" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                Password
                </label>
                <span className={`absolute right-3 top-3 ${isValid.password ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
            </div>

            <div className="relative">
                <input
                type="text"
                id="coupon"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 ${touched.coupon && !isValid.coupon ? 'border-red-300' : 'border-gray-200'} rounded-lg focus:border-purple-500 focus:outline-none peer text-gray-700 font-normal placeholder-gray-600`}
                placeholder=" "
                />
                <label 
                htmlFor="coupon" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                COUPON
                </label>
                <span className={`absolute right-3 top-3 ${isValid.coupon ? 'text-green-500' : 'text-red-500'}`}>•</span>
                {touched.coupon && errors.coupon && (
                <p className="text-red-500 text-xs mt-1">{errors.coupon}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
            >
                SIGN UP
            </button>
            </form>

            <div className="mt-6 text-center">
            {/* <p className="text-sm text-gray-500 mb-4">Or continue with</p>
            <div className="flex justify-center gap-4">
                <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-gray-300">
                <Image src="/google.svg" alt="Google" width={24} height={24} />
                </button>
                <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-gray-300">
                <Image src="/apple.svg" alt="Apple" width={24} height={24} />
                </button>
                <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-gray-300">
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
                </button>
            </div> */}
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign In!
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;