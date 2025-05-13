"use client";
import React from 'react';
import Image from 'next/image';

interface PlanProps {
  title: string;
  price: number;
  description: string;
  buttonText: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PlanProps> = ({ title, price, description, buttonText, isPopular }) => (
  <div className={`bg-white rounded-3xl p-8 shadow-lg w-[300px] relative ${isPopular ? 'border-2 border-purple-500' : ''}`}>
    {isPopular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
        Most Popular
      </span>
    )}
    <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
    <div className="flex items-baseline mb-4">
      <span className="text-gray-500 text-lg">₹</span>
      <span className="text-4xl font-bold text-gray-900">{price}</span>
      {price > 0 && <span className="text-gray-500 ml-1">/month</span>}
    </div>
    <p className="text-gray-600 mb-6 min-h-[60px]">{description}</p>
    <button 
      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
        isPopular 
          ? 'bg-purple-600 text-white hover:bg-purple-700' 
          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
      }`}
    >
      {buttonText}
    </button>
  </div>
);

const Page = () => {
  const plans = [
    {
      title: "Starter Plan",
      price: 0,
      description: "Perfect to get started and explore our core features at no cost",
      buttonText: "Start Free",
    },
    {
      title: "Monthly Plan",
      price: 29,
      description: "Complete solution for individuals who need more features and flexibility",
      buttonText: "Subscribe Now",
      isPopular: true,
    },
    {
      title: "Yearly Plan",
      price: 270,
      description: "Best value for money with all features and priority support",
      buttonText: "Save More",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/assets/svg/SubscriptionBackgroundBlob.svg"
        alt="Background Pattern"
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Subscription Plans</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the perfect plan that suits your needs. All plans come with our core features.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;