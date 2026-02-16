'use client'

import { useState } from 'react'

interface FAQProps {
  activeTab: 'flexible' | 'fixed'
}

export default function FAQ({ activeTab }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const flexibleFAQs = [
    {
      question: 'How do I start earning interest?',
      answer:
        "After you create your account, you need to transfer crypto, and maintain an account balance above $1,000 worth of digital assets. You'll begin earning daily interest on your digital assets a minimum of 24 hours.",
    },
    {
      question: 'How is interest paid out to my Exius account?',
      answer:
        'Interest with Flexible Savings is paid out automatically every day to your account. The interest is credited to your holdings balance. This compounding effect helps you grow your portfolio faster.',
    },
    {
      question: 'How do I earn the highest interest rates?',
      answer:
        'To receive the highest interest, you need to: Maintain an account balance above $5,000 worth of digital assets.',
    },
  ]

  const fixedFAQs = [
    {
      question: 'What is the difference between Flexible and Fixed-term Savings?',
      answer:
        'Unlike Flexible Savings, which allow you to withdraw or exchange your assets anytime, Fixed-term Savings allow you to lock your digital assets for a predefined period to earn bonus interest.',
    },
    {
      question: 'How is interest paid out to my Exius account?',
      answer:
        'You will receive all interest earned for the duration of the term in a single payout at the end of the period, regardless of your payout preference. You will see your account balance update weekly with the interest. Before you can create a fixed term, you first need to maintain an account balance above $5,000 worth of a digital asset.',
    },
    {
      question: 'What is automatic renewal and how to enable it?',
      answer:
        "With automatic renewal, your term is prolonged for the same period once the interest payout is completed, granted your account balance at the time is above $5,000 worth of digital assets. This way, you continue to earn additional interest without any interruptions. When your term renews automatically, by default, only the principal amount will be relocked, whereas the accrued interest will be added to your Savings Wallet.",
    },
  ]

  const faqs = activeTab === 'flexible' ? flexibleFAQs : fixedFAQs

  return (
    <section className="mb-20">
      <h2 className="text-4xl md:text-5xl font-medium text-primary text-center mb-12">FAQ</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-semibold text-primary pr-8">{faq.question}</span>
              <svg
                className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-6 pt-0 text-subtext leading-relaxed">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
