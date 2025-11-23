export type QuizChart = {
  quiz: string,
  skor: number,
  maksimal: number,
  persentase: number,
}

export type LearningChart = {
  name: string,
  selesai: number,
  total: number,
  persentase: number,
}

export type QuizHistory = {
  date: string,
  score: number,
  total: number
}