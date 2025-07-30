import { formatDate } from "@/app/helpers/formatting-helpers"
import * as React from "react"
import { Poetsen_One } from 'next/font/google';

const poetsonOne = Poetsen_One({
  subsets: ['latin'],
  weight: '400'
});

export default function Card({item, kidAnswer, selectedAge, setSelectedAge}: any) {
  
 
  return (
          <div
            key={item.id}
            className="question-card transition-all duration-200 border border-gray-100 bg-white shadow-lg p-6 rounded-md"
          >
            <div className="pb-4">
              <div className="md:flex items-start justify-between gap-4">
                <div className={`max-md:w-full items-center gap-3 text-2xl font-semibold tracking-tight flex-shrink-1 text-gray-900 ${poetsonOne.className}`}>                      
                  {item.question}
                </div>
                <div className="text-right text-xs text-gray-400 mt-1 flex-shrink-0 max-md:w-full max-md:flex items-center">
                  <div>Asked by a {item.asked_by_age}-year old</div>
                  <div className="max-md:ml-2 text-gray-300">{formatDate(item.asked_date)}</div>
                </div>
              </div>
            </div>
            <div className="pt-0 space-y-8">
              {/* Kid Answer */}
              <div className="space-y-4">
                
                <div className="flex items-center">
                  <div className="text-slate-600 border-blue-100 inline-block p-1 pr-3 rounded-md mb-2">
                    👶 For a {selectedAge}-year old
                  </div>

                  {/* <div className="flex items-center justify-center gap-3 mt-3 mb-6">
                    <div className="flex gap-1">
                      {ages.map((age) => (
                        <div
                          key={age}
                          onClick={() => setSelectedAge(age)}
                          className={`py-3 px-4 text-sm font-medium transition-all transition-200 rounded-lg flex justify-center items-center cursor-pointer ${
                            selectedAge === age
                              ? "bg-gray-900 text-white shadow-sm"
                              : "text-gray-200 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {age}
                          {selectedAge === age && '-year old'}
                        </div>
                      ))}
                    </div>
                </div> */}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                  <p className="text-gray-800 leading-relaxed">{kidAnswer}</p>
                </div>
              </div>

              {/* Grown-up Answer */}
              <div className="space-y-4">
                <div className="bg-gray-50 text-gray-700 border-gray-200 inline-block p-1 pr-3 rounded-md mb-2">
                  🧑‍🎓 For Grown-Ups
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-md p-4">
                  <p className="answer-grownup text-gray-700 text-sm leading-relaxed">{item.grownup_answer}</p>
                </div>
              </div>
            </div>
          </div>
  )
}