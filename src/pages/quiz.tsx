import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";

import Radio from "../components/Radio";
import Question from "../models/Question";

function Quiz() {
  const alphabetImages: Record<string, string> = import.meta.glob('../assets/alphabet/*.png', { eager: true, import: 'default' });

  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [listQuestion, setListQuestion] = useState<Question[]>([]);

  const questionType = ['choose-letter', 'choose-images']

  const question = listQuestion[currentQuestion];
  const progress = ((currentQuestion + 1) / listQuestion.length) * 100;

  function handleAnswerSelect(questionId: number, answerIndex: number) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
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
    window.api.getModule('alphabet').then((result) => {
      setListQuestion(
        Array.from({ length: 5 }, (_, index) => {
          const tipe = questionType[Math.round(Math.random())]
          const soal = result.finished[Math.floor(Math.random() * result.finished.length)]
          let opsi = Array.from({ length: 4 }, (_, index) => {
            const abjad = getRandomLetters(4);

            return tipe == 'choose-letter'
                ? abjad[index]
                : alphabetImages[`../assets/alphabet/${abjad[index]}.png`]
            
          })

          if (!opsi.some(item => item == soal)) {
            const random4 = Math.floor(Math.floor(Math.random() * 4));
            opsi = opsi.map((item, index) => {
              return index == random4
                ? tipe == 'choose-letter'
                    ? soal
                    : alphabetImages[`../assets/alphabet/${soal}.png`]
                : item;
            })
          }

          return new Question(index + 1,
            tipe,
            tipe == 'choose-letter' ? alphabetImages[`../assets/alphabet/${soal}.png`] : soal,
            `Pililah ${tipe == 'choose-letter' ? 'huruf' : 'gambar'} yang sesuai dengan ${tipe == 'choose-letter' ? 'gambar' : 'huruf'} yang ditampilkan`,
            opsi,
            opsi.findIndex(item => item == soal)
          )
        })
      )
    });
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
              Uji pemahaman Anda tentang bahasa isyarat dengan menjawab 5 pertanyaan berikut.
              Anda akan mendapatkan skor di akhir kuis! 🌟
            </p>
            <button
              onClick={() => setQuizStarted(true) }
              className="bg-linear-to-r from-orange-500 to-pink-500 text-white border-0 hover:scale-105 transition-transform shadow-lg py-2 rounded-md hover:cursor-pointer"
            >
              🚀 Mulai Kuis
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto pt-8">
      <div className="grid grid-cols-1 gap-5">
        <div className="w-xl mb-6 mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">
              📝 Pertanyaan {currentQuestion + 1} dari {listQuestion.length}
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
                  <Radio key={index} value={item} label={item} tipe={question.type} checked={selectedAnswers[question.id] == item} onChange={() => handleAnswerSelect(question.id, item)} />
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
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={currentQuestion + 1 >= listQuestion.length}
            className="ml-auto bg-black rounded-md text-white px-10 py-2 hover:bg-gray-800 hover:cursor-pointer hover:disabled:cursor-not-allowed disabled:opacity-30"
          >
            Selanjutnya
            {/* {currentQuestion === quizQuestions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'} */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz;