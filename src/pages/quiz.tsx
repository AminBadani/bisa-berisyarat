import { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle, FaTrophy } from "react-icons/fa";
import { useModuleStore } from "../store/moduleStore";

import Radio from "../components/Radio";
import Question from "../models/Question";
import { CiWarning } from "react-icons/ci";

function Quiz() {
  const letterImages: Record<string, string> = import.meta.glob('../assets/letter/*.png', { eager: true, import: 'default' });

  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questionType = ['choose-letter', 'choose-images']
  const learned = useModuleStore(s => s.modules)[0].materials.filter(item => item.isLearned == true).map(item => item.id);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  function handleAnswerSelect(questionId: number, answerIndex: number) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
    console.log(selectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const result = {
        date: new Date().toISOString(),
        score: calculateScore(),
        total: quizQuestions.length,
      };

      window.api.addQuiz(result);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  function getRandomLetters(k = 4) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split('');

    // partial Fisher-Yates shuffle (only first k)
    for (let i = 0; i < k; i++) {
      const j = i + Math.floor(Math.random() * (letters.length - i));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    return letters.slice(0, k);
  }

  useEffect(() => {
    if (learned.length <= 1) return

    setQuizQuestions(
      Array.from({ length: 5 }, (_, index) => {
        const tipe = questionType[Math.round(Math.random())]
        const soal = learned[Math.floor(Math.random() * learned.length)]
        let opsi = Array.from({ length: 4 }, (_, index) => {
          const abjad = getRandomLetters(4);

          return tipe == 'choose-letter'
            ? abjad[index]
            : letterImages[`../assets/letter/${abjad[index]}.png`]

        })

        if (!opsi.some(item => item == soal)) {
          const random4 = Math.floor(Math.floor(Math.random() * 4));
          opsi = opsi.map((item, index) => {
            return index == random4
              ? tipe == 'choose-letter'
                ? soal
                : letterImages[`../assets/letter/${soal}.png`]
              : item;
          })
        }

        return new Question(index + 1,
          tipe,
          tipe == 'choose-letter' ? letterImages[`../assets/letter/${soal}.png`] : soal,
          `Pililah ${tipe == 'choose-letter' ? 'huruf' : 'gambar'} yang sesuai dengan ${tipe == 'choose-letter' ? 'gambar' : 'huruf'} yang ditampilkan`,
          opsi,
          opsi.findIndex(item => tipe == 'choose-letter' ? item == soal : item == letterImages[`../assets/letter/${soal}.png`])
        )
      })
    )
  }, [])

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 text-center bg-linear-to-br from-yellow-100 to-orange-100 border-4 shadow-2xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-300">
            <FaTrophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
            <h1 className="bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🎯 Kuis Bahasa Isyarat 🎯
            </h1>
            <p className="text-gray-700 mb-6">
              Uji pemahaman Kamu tentang bahasa isyarat dengan menjawab 5 pertanyaan berikut.
              Kamu akan mendapatkan skor di akhir kuis! 🌟
              {
                learned.length <= 1 && (
                  <div className="bg-yellow-200 p-5 mt-10">
                    <CiWarning className="mx-auto w-20 h-20" />
                    <p>
                      Kamu masih belum bisa untuk mengerjakan kuis, harap belajar paling tidak 2 materi modul huruf terlebih dahulu</p>
                  </div>
                )
              }
            </p>
            <button
              disabled={learned.length <= 1}
              onClick={() => setQuizStarted(true)}
              className="bg-linear-to-r from-orange-500 to-pink-500 text-white border-0 hover:not-disabled:scale-105 transition-transform shadow-lg py-2 rounded-md hover:not-disabled:cursor-pointer hover:disabled:cursor-not-allowed disabled:opacity-30"
            >
              🚀 Mulai Kuis
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-linear-to-br from-yellow-100 to-orange-100 border-4 shadow-2xl border-gray-300 rounded-2xl">
            <div className="text-center mb-8">
              <FaTrophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
              <h1 className="bg-linear-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                🎉 Hasil Kuis 🎉
              </h1>
              <div className="mb-4">
                <div className="text-gray-800">
                  Skor Kamu: {score} dari {quizQuestions.length}
                </div>
                <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full inline-block mt-2">
                  Persentase: {percentage.toFixed(0)}%
                </div>
              </div>
              {percentage >= 80 ? (
                <p className="text-green-600">✨ Luar biasa! Kamu sangat memahami bahasa isyarat! ✨</p>
              ) : percentage >= 60 ? (
                <p className="text-blue-600">👍 Bagus! Terus belajar untuk meningkatkan pemahaman.</p>
              ) : (
                <p className="text-orange-600">💪 Tetap semangat! Cobalah belajar lebih banyak.</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-gray-800">📝 Pembahasan:</h2>
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="p-4 bg-white rounded-xl">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <FaCheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" aria-hidden="true" />
                      ) : (
                        <FaCircleXmark className="w-6 h-6 text-red-600 shrink-0 mt-1" aria-hidden="true" />
                      )}
                      <div className="grow">
                        {
                          question.type == 'choose-letter' ?
                            (
                              <p className="text-gray-800 mb-2">
                                {index + 1}. Pilihlah huruf yang sesuai gambar 
                                <img src={question.question} alt="" className="h-20" />
                              </p>
                            ) : (
                              <p className="text-gray-800 mb-2">
                                {index + 1}. Pilih gambar yang sesuai huruf '{question.question.toUpperCase()}'
                              </p>
                            )
                        }
                        <p className="text-gray-600">
                          {
                            question.type == 'choose-letter' ?
                              (
                                <>
                                  Jawaban Kamu: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                    {question.options[userAnswer].toUpperCase()}
                                  </span>
                                </>
                              ) : (
                                <>
                                  Jawaban Kamu:
                                  <img src={question.options[userAnswer]} alt="" className="h-20" />
                                </>
                              )
                          }
                        </p>
                        {!isCorrect && (
                          question.type == 'choose-letter' ? (
                          <p className="text-gray-600">
                            Jawaban Benar: <span className="text-green-600">
                              {question.options[question.correctAnswer].toUpperCase()}
                            </span>
                          </p>
                          ) : (
                          <p className="text-gray-600">
                            Jawaban Benar: <span className="text-green-600">
                              <img src={question.options[question.correctAnswer]} alt="" className="h-20" />
                            </span>
                          </p>

                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => resetQuiz()} className="bg-white rounded-md px-5 py-2 text-sm hover:bg-gray-100 hover:cursor-pointer">
                Ulangi Kuis
              </button>
              <button onClick={() => window.location.href = '/learn'}  className="bg-black text-white rounded-md px-5 py-2 text-sm hover:bg-gray-900 hover:cursor-pointer">
                Kembali Belajar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-8">
      <div className="grid grid-cols-1 gap-5">
        <div className="w-xl mb-6 mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">
              📝 Pertanyaan {currentQuestion + 1} dari {quizQuestions.length}
            </span>
            <span className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
            />
          </div>
        </div>

        <div className="flex gap-32 mx-auto">

          <div className="p-8 bg-linear-to-br from-blue-50 to-purple-50 border-4 shadow-xl bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-300">
            {
              (question.type == 'choose-letter') ?
                (
                  <img
                    src={question.question}
                    className="w-64 h-64 object-contain rounded-xl"
                  />
                ) : (
                  <div className="content-center text-center font-bold text-[10rem] text-gray-900 w-64 h-64">
                    {question.question.toUpperCase()}
                  </div>
                )
            }
          </div>

          <div className="flex flex-col">
            <h2 className="text-gray-800 mb-6">❓ {question.description}</h2>
            <ul className="select-none grid gap-4 grid-cols-2">
              {question.options.map((item, index) => {
                return (
                  <Radio key={index} value={item} label={item} tipe={question.type} checked={selectedAnswers[question.id] == index} onChange={() => handleAnswerSelect(question.id, index)} />
                )
              })}
            </ul>
          </div>

        </div>

        <div className="flex gap-4 mt-20 w-xl mx-auto">
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
            className="bg-white rounded-md text-black px-10 py-2 border border-gray-300 hover:bg-gray-100 hover:cursor-pointer hover:disabled:cursor-not-allowed disabled:opacity-30"
          >
            Sebelumnya
          </button>
          <button
            onClick={() => handleNext()}
            disabled={selectedAnswers[question.id] === undefined}
            className="ml-auto bg-black rounded-md text-white px-10 py-2 hover:bg-gray-800 hover:cursor-pointer hover:disabled:cursor-not-allowed disabled:opacity-30"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz;