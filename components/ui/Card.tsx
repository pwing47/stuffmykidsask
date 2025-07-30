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
            className="question-card transition-all duration-200 bg-white shadow-lg/5 p-6 rounded-md"
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
                
                  <div className="text-slate-600 inline-block font-bold p-1 pr-3 mb-2">
                    👧 For a {selectedAge}-year old
                  </div>

                <div className="bg-blue-50/40 border-l-2 border-l-blue-100 p-4">
                  <p className="text-gray-800 leading-relaxed">{kidAnswer}</p>
                </div>
              </div>

              {/* Grown-up Answer */}
              <div className="space-y-4">
                <div className="text-gray-700 border-gray-200 font-bold inline-block p-1 pr-3 mb-2">
                  🧑‍🎓 For Grown-Ups
                </div>
                <div className="bg-slate-100/40 border-l-2 border-l-slate-100 p-4">
                  <p className="answer-grownup text-gray-700 text-sm leading-relaxed">{item.grownup_answer}</p>
                </div>
              </div>
            </div>
          </div>
  )
}