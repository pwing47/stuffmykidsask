"use client"

import { useState, useEffect } from "react"
import { getQuestions } from "../lib/questions"
import type { Question } from "../models/database"
import { LoadingSkeleton } from "../components/LoadingSkeleton"

import { Karla } from 'next/font/google';
import Header from "@/components/ui/Header"
import Card from "@/components/ui/Card"
import { AnimatePresence } from "motion/react"

const nunito = Karla({
  subsets: ['latin'],
  weight: '400'
});

export default function Page() {
  const [selectedAge, setSelectedAge] = useState<2 | 3 | 4 | 5 | 6 | 7>(4)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")

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

  const getKidAnswer = (question: Question): string => {
    const columnName = `kid_answer_age_${selectedAge}` as keyof Question
    return (question[columnName] as string) || "Answer not available for this age."
  }

  // Filter questions based on search term
  const filteredCards = questions.filter(
    (question) =>
      getKidAnswer(question).toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.grownup_answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
    return (
      <div className="min-h-screen">

        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedAge={selectedAge} setSelectedAge={setSelectedAge} />

        <main className={`container mx-auto px-3 py-12 tracking-tight ${nunito.className}`}>
            
            { loading &&         
            <LoadingSkeleton />
            }

            {
              error &&
              
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
            }

            {
              !loading && !error &&

              <>
                <div className="max-w-4xl mx-auto space-y-8">
                  {filteredCards.length === 0 ? (
                    <div className="border border-gray-200 bg-white">
                      <div className="text-center py-12">
                        <p className="text-gray-500">No questions found. Check back later!</p>
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence>
                    {filteredCards.map((item, index) => (                      
                        <Card key={item.id} item={item} index={index} selectedAge={selectedAge} kidAnswer={getKidAnswer(item)} />
                    ))}
                  </AnimatePresence>
                  )}
                </div>

                {/* Footer */}
                <div className="text-center mt-16 py-8">
                  <p className="text-gray-500 text-sm">Created by <strong><a href="https://www.philipcowles.com">Philip Cowles</a></strong><br/>for his curious kids 🌟</p>
                </div>
              </>
            }
        
        </main>
        
      </div>
    )
}
