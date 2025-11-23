import { useEffect, useState } from "react";
import { FaBook, FaComment, FaTrophy, FaCheckCircle } from "react-icons/fa"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useModuleStore } from "../store/moduleStore";
import { QuizChart } from "../types/Chart";

import Card from "../components/Card"
import LearningModule from "../models/LearningModule"
import LearningMaterial from "../models/LearningMaterial";
import AlphabetModule from "../models/modules/AlphabetModule";
import WordModule from "../models/modules/WordModule";

import letter from "../data/letter.json";
import word from "../data/word.json";

/**
 * Halaman utama untuk memilih modul pelajaran dan melihat statistik singkat
 */
function Learn() {
  /** Import semua gambar dari dalam folder letter */
  const letterImages: Record<string, string> = import.meta.glob('../assets/letter/*.png', { eager: true, import: 'default' });

  /** Modul yang saat ini sedang dipilih */
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  /** Index materi dari modul yang dipilih, misal alphabetModul[0 sampai 25] */
  const [currentLearningIndex, setCurrentLearningIndex] = useState<number | null>(null);
  /** Data quiz yang digunakan untuk menampilkan statisik kuis */
  const [quizChart, setQuizChart] = useState<QuizChart[]>([]);

  /** Daftar modul yang bisa dipilih, ada 2 alphabetModule dan wordModule */
  const modules = useModuleStore(s => s.modules);
  /** Digunakan untuk meng-update isi dari modules */
  const setModules = useModuleStore(s => s.setModules);

  /** Materi yang saat ini sedang dipilih untuk ditampilkan */
  const currentMateri = selectedModule?.materials[currentLearningIndex || 0];

  /**
   * Update materi menjadi selesai dipelajari dan tambahkan ke dalam progress,
   * untuk memastikan antara data yang tersimpan dan yang ditampilkan sinkron 
   * @param materialIndex 
   */
  function doneLearned(materialIndex: number) {
    if (!selectedModule) return; /** Memastikan bahwa ada module yang dipilih */

    const updateModul = useModuleStore.getState().updateModule;

    const updated = selectedModule.clone();
    updated.materials = selectedModule.materials.map(m => m.clone());
    updated.materials[materialIndex].changeFinishedTrue(updated.id);

    // Update selectedModul dilokal
    setSelectedModule(updated);

    // Update global modul yang tersimpan 
    updateModul(updated.id, updated);
  }

  /**
   * Fungsi useEffect dari React,
   * yang dijalankan 1 kali ketika halaman dimuat
   */
  useEffect(() => {
    /** Ambil semua isi dari module di dalam file .json */
    window.api.get("module").then(result => {

      /** Ambil dari module.learn == 'letter' */
      const letters = result.find((item: any) => item.learn === 'letter')
      /** Membuat objek AlphabetModule */
      const letterModule = new AlphabetModule('Belajar huruf', 'Pelajari isyarat untuk huruf A-Z',
        letter.map(item =>
          new LearningMaterial(
            item.letter,
            item.description,
            letters['finished'].includes(item.letter),
            letterImages[`../assets/letter/${item.letter}.png`],
            '')
        ),
        <FaBook className="text-white w-6 h-6" />
      )

      /** Ambil dari module.learn == 'word' */
      const words = result.find((item: any) => item.learn === 'word')
      /** Membuat objek WordModule */
      const wordModule = new WordModule('Belajar kata', 'Pelajari kata dasar yang digunakan sehari-hari',
        word.map(item =>
          new LearningMaterial(
            item.word,
            item.description,
            words['finished'].includes(item.word),
            '',
            '')
        ),
        <FaComment className="text-white  w-6 h-6" />
      );

      /** Masukkan objek AlphabetModule dan WordModule ke dalam list modules */
      setModules([letterModule, wordModule]);
    });

    /** Ambil semua data quiz dari dalam file .json */
    window.api.getQuiz().then(result => {
      setQuizChart(
        result.map((item: any, index: any) => {
          return {
            quiz: `Kuis ${index + 1}`,
            skor: item.score,
            maksimal: item.total,
            persentase: Number(((item.score / item.total) * 100).toFixed(0)),
          }
        })
      )
    })
  }, [])

  return (
    <div className="container mx-auto pt-8">

      {
        !selectedModule ? (
          <>
            <header className="mb-8 text-center">
              <h1 className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✨ Halaman Belajar ✨</h1>
              <p className="text-gray-700">Pilih modul pembelajaran untuk memulai petualangan!</p>
            </header>

            <div className="grid grid-cols-[40%_57%] gap-10">
              <div className="grid grid-cols-1 gap-2">
                {
                  modules.map(item => (
                    <Card
                      key={item.id}
                      judul={item.title}
                      deskripsi={item.description}
                      selesai={item.countFinished}
                      jumlah={item.countMaterials}
                      icon={item.icon}
                      onClick={() => { setSelectedModule(item); console.log(quizChart) }}
                    />
                  ))

                }
              </div>

              <div className="grid gap-y-6">

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border-2 shadow-lg bg-card text-card-foreground border-white bg-linear-to-br from-yellow-50 to-orange-50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-linear-to-br from-pink-400 to-rose-500 rounded-xl shadow-md">
                        <FaTrophy className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-gray-700">Item dipelajari</p>
                        <p className="text-gray-800">{modules[0]?.countFinished + modules[1]?.countFinished} / {modules[0]?.countMaterials + modules[1]?.countMaterials}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-2 shadow-lg bg-card text-card-foreground border-white bg-linear-to-br from-yellow-50 to-orange-50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-linear-to-br from-pink-400 to-rose-500 rounded-xl shadow-md">
                        <FaTrophy className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-gray-700">Progress belajar</p>
                        <p className="text-gray-800">{Math.round((modules[0]?.countFinished + modules[1]?.countFinished) / (modules[0]?.countMaterials + modules[1]?.countMaterials) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-yellow-50 to-orange-50 border-2 shadow-lg border-white h-fit">
                  <h2 className="text-gray-800 mb-6">📈 Grafik Perkembangan Skor Kuis</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={quizChart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quiz" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 rounded-lg shadow-lg border">
                                <p className="text-gray-800">{payload[0].payload.quiz}</p>
                                <p className="text-blue-600">
                                  Skor: {payload[0].payload.skor} / {payload[0].payload.maksimal}
                                </p>
                                <p className="text-gray-600">Persentase: {payload[0].payload.persentase}%</p>
                              </div>
                            );
                          }
                          return <div className="text-center text-gray-500 p-10">No data available</div>;
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="skor"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Skor"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>

        ) : currentLearningIndex != null ? (

          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-1">
              <div>
                <button
                  onClick={() => { setCurrentLearningIndex(null) }}
                  className="hover:scale-105 hover:bg-gray-100 transition-transform px-5 py-2 bg-white text-black"
                  aria-label="Kembali ke halaman utama"
                >
                  ← Kembali ke Daftar
                </button>

                <div className="pt-10 text-center">

                  <div className="mb-8">
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="mb-4">
                        <div className="p-4 rounded-2xl shadow-2xl border-4 border-white relative">
                          {
                            currentMateri?.image != '' ?
                              (
                                <img
                                  src={currentMateri?.image}
                                  alt={`Bahasa isyarat untuk ${currentMateri?.id}`}
                                  className="w-64 h-64 object-contain rounded-xl"
                                />
                              ) : (
                                <p>Masih belum ada gambar</p>
                              )
                          }
                          <div className={`${selectedModule?.id != 'letter' ? 'hidden' : ''} absolute -top-3 -right-3 px-4 py-2 rounded-full bg-linear-to-br from-yellow-50 to-orange-50 text-white shadow-lg`}>
                            <span className="text-xl text-black">
                              {currentMateri?.id.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <div className="mb-8 text-center">
                  <h2 className="text-gray-800 mb-2">
                    ⭐ Huruf {currentMateri?.id.toUpperCase()} ⭐
                  </h2>
                  <p className="text-gray-700">
                    {currentMateri?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-center">
              <div className="mt-6">
                <progress max={selectedModule.countMaterials} value={selectedModule.countFinished} className="rounded-full overflow-hidden w-full h-5
                  bg-gray-300
                  [&::-webkit-progress-bar]:bg-gray-300
                  [&::-webkit-progress-value]:bg-gray-800
                  [&::-moz-progress-bar]:bg-gray-800"></progress>
                <p className="text-center mt-2 text-gray-700">
                  🚀 Kamu sudah belajar {selectedModule.countFinished} dari {selectedModule.countMaterials} item!
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    doneLearned(currentLearningIndex - 1);
                    setCurrentLearningIndex(() => currentLearningIndex - 1)
                  }}
                  disabled={currentLearningIndex === 0}
                  aria-label="Item sebelumnya"
                  className="bg-white text-black border-0 not-disabled:hover:scale-110 transition-transform shadow-lg h-fit px-5 py-2 rounded-md disabled:opacity-30"
                >
                  ⬅️ Sebelumnya
                </button>
                <button
                  onClick={() => {
                    doneLearned(currentLearningIndex + 1);
                    setCurrentLearningIndex(() => currentLearningIndex + 1)
                  }}
                  disabled={currentLearningIndex >= ((selectedModule?.materials?.length ?? 0) - 1)}
                  className="bg-white text-black border-0 not-disabled:hover:scale-110 transition-transform shadow-lg h-fit px-5 py-2 rounded-md disabled:opacity-30"
                  aria-label={
                    currentLearningIndex === ((selectedModule?.materials?.length ?? 0) - 1)
                      ? 'Selesai'
                      : 'Selanjutnya'
                  }
                >
                  {currentLearningIndex === ((selectedModule?.materials?.length ?? 0) - 1)
                    ? '🎊 Selesai'
                    : 'Selanjutnya ➡️'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => { setCurrentLearningIndex(null); setSelectedModule(null) }}
              className="hover:scale-105 hover:bg-gray-100 transition-transform px-5 py-2 bg-white text-black"
              aria-label="Kembali ke halaman utama"
            >
              ← Kembali ke Halaman Utama
            </button>

            <header className="mb-6 text-center">
              <h1 className={`bg-gray-700 bg-clip-text text-transparent mb-2`}>
                {selectedModule?.title}
              </h1>
              <p className="text-gray-700">{selectedModule?.description}</p>
              <div className="mt-4 max-w-md mx-auto">
                <progress max={selectedModule.countMaterials} value={selectedModule.countFinished} className="rounded-full overflow-hidden w-full h-3
                  bg-gray-300
                  [&::-webkit-progress-bar]:bg-gray-300
                  [&::-webkit-progress-value]:bg-gray-800
                  [&::-moz-progress-bar]:bg-gray-800"></progress>
                <p className="text-center mt-2 text-gray-700">
                  🎯 Progress: {selectedModule.countFinished} / {selectedModule.countMaterials}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-6">
              {selectedModule?.materials.map((item, index) => {
                const colors = ['from-pink-200 to-rose-200', 'from-blue-200 to-cyan-200', 'from-purple-200 to-indigo-200', 'from-orange-200 to-yellow-200', 'from-green-200 to-emerald-200'];
                const bgColor = colors[index % colors.length];

                return (
                  <div key={item.id} >
                    <div
                      className={`relative p-4 cursor-pointer border-2 h-fit rounded-xl border-gray-300  hover:shadow-2xs hover:scale-90 transition-all bg-linear-to-br ${bgColor} ${item.isLearned ? 'ring-4 ring-green-400 shadow-green-200' : 'hover:border-white'}`}
                      onClick={() => {
                        doneLearned(index)
                        setCurrentLearningIndex(() => index);
                      }}
                    >
                      {item.isLearned && (
                        <div
                          className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg"
                        >
                          <FaCheckCircle
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <div className="flex flex-col items-center justify-center text-center h-32">
                        <div className="mb-2">
                          {
                            item?.image != '' ?
                              (
                                <img
                                  src={item.image}
                                  alt={`Isyarat ${item.id}`}
                                  className="w-32 h-32 object-cover rounded-lg"
                                />
                              ) :
                              (
                                <p>No Image</p>
                             )
                          }
                        </div>
                        <p className="text-gray-800">{item.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )
      }
    </div>
  )
}

export default Learn;