"use client"

import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
// import { Badge } from "@/components/ui/Badge"
// import { Button } from "@/components/ui/Button"
import { getQuestions } from "../lib/questions"
import type { Question } from "../models/database"
import { LoadingSkeleton } from "../components/LoadingSkeleton"

import { Poetsen_One, Nunito } from 'next/font/google';
import Halaney from 'next/font/local';
import Header from "@/components/ui/Header"

export const poetson_one = Poetsen_One({
  subsets: ['latin'],
  weight: '400'
});

export const nunito = Nunito({
  subsets: ['latin'],
  weight: '400'
});

export const halaney = Halaney({
  src: '../public/Halaney.otf',
  display: 'swap', // recommended for better UX
});

export default function Page() {
  const [selectedAge, setSelectedAge] = useState<2 | 3 | 4 | 5 | 6 | 7>(4)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const ages = [2, 3, 4, 5, 6, 7] as const

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        setError(null)
        const data = await getQuestions()
        setQuestions(data)
      } catch (err) {
        setError("Failed to load questions. Please try again later.")
        console.error("Error loading questions:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const getKidAnswer = (question: Question, age: 2 | 3 | 4 | 5 | 6 | 7): string => {
    const columnName = `kid_answer_age_${age}` as keyof Question
    return (question[columnName] as string) || "Answer not available for this age."
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatLineBreaks = (answerString: string): string => {
    return answerString.replace("\n/g", "<br/>");
  }

  
    return (
      <div className="min-h-screen bg-purple-50">

        <Header />

        <header className="bg-green-200 border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-6">
            <h1 className={`text-5xl md:text-6xl font-bold text-center text-gray-900 ${halaney.className}`}>Stuff My Kids Ask</h1>
            <p className="text-center text-gray-600 mt-3 text-md font-medium">
              Curious questions deserve thoughtful answers
            </p>
            
            {/* Age Selector */}
            <div className="flex items-center justify-center gap-3 mt-3 mb-6">
              <span className="text-sm font-medium text-gray-600">Select age:</span>
              <div className="flex gap-1">
                {ages.map((age) => (
                  <div
                    key={age}
                    onClick={() => setSelectedAge(age)}
                    className={`h-8 w-8 p-0 text-sm font-medium transition-all rounded-lg flex justify-center items-center cursor-pointer ${
                      selectedAge === age
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {age}
                  </div>
                ))}
              </div>
          </div>
            
          </div>
        </header>

        { loading && 
          <main className="container mx-auto px-6 py-12">
            <LoadingSkeleton />
          </main>
        }

        {
          error &&
          <main className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="border border-red-200 bg-red-50">
                <div className="flex items-center gap-3 p-6">
                  <div>
                    <h3 className="font-semibold text-red-900">Error Loading Questions</h3>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </main>
        }

        {
          !loading && !error &&
          <main className={`container mx-auto px-6 py-12 ${nunito.className} font-sans`}>
            <div className="max-w-4xl mx-auto space-y-8">
              {questions.length === 0 ? (
                <div className="border border-gray-200 bg-white">
                  <div className="text-center py-12">
                    <p className="text-gray-500">No questions found. Check back later!</p>
                  </div>
                </div>
              ) : (
                questions.map((item) => (
                  <div
                    key={item.id}
                    className="group transition-all duration-200 border border-gray-100 bg-white shadow-lg p-6 rounded-md"
                  >
                    <div className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`flex items-center gap-3 text-xl font-semibold text-gray-900 flex-1 ${poetson_one.className} font-sans`}>                      
                          {item.question}
                        </div>
                        <div className="text-right text-xs text-gray-400 mt-1 flex-shrink-0">
                          <div>Asked by a {item.asked_by_age}-year old</div>
                          <div className="mt-0.5">{formatDate(item.asked_date)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-0 space-y-8">
                      {/* Kid Answer */}
                      <div className="space-y-4">
                        
                          <div className="bg-blue-50 text-slate-600 border-blue-100 inline-block p-1 pr-3 rounded-md mb-2">
                            👶 For a {selectedAge}-year old kid
                          </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                          <p className="text-gray-800 leading-relaxed">{getKidAnswer(item, selectedAge)}</p>
                        </div>
                      </div>

                      {/* Grown-up Answer */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 text-gray-700 border-gray-200 inline-block p-1 pr-3 rounded-md mb-2">
                          🧑‍🎓 For Grown-Ups
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-md p-4">
                          <p className="answer-grownup text-gray-700 text-sm leading-relaxed">{formatLineBreaks(item.grownup_answer)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-16 py-8">
              <p className="text-gray-500 text-sm">Created by <strong><a href="https://www.philipcowles.com">Philip Cowles</a></strong><br/>for his curious kids 🌟</p>
            </div>
          </main>
        }

        
      </div>
    )
}
