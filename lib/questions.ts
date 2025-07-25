import { supabase } from "./supabase"
import type { Question } from "../models/database"

export async function getQuestions(): Promise<Question[]> {
  try {
    const { data, error } = await supabase.from("kidquestions").select("*").order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching questions:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Failed to fetch questions:", error)
    throw error
  }
}

export async function getQuestionById(id: number): Promise<Question | null> {
  try {
    const { data, error } = await supabase.from("kidquestions").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching question:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to fetch question:", error)
    throw error
  }
}
