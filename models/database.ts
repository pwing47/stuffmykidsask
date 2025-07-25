export interface Question {
  id: number
  question: string
  icon_name: string
  asked_by_age: number
  asked_date: string
  created_at: string
  grownup_answer: string
  kid_answer_age_2: string
  kid_answer_age_3: string
  kid_answer_age_4: string
  kid_answer_age_5: string
  kid_answer_age_6: string
  kid_answer_age_7: string
}

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: Question
        Insert: Omit<Question, "id" | "created_at">
        Update: Partial<Omit<Question, "id" | "created_at">>
      }
    }
  }
}
