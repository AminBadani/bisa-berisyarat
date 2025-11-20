import { useEffect, useState } from "react";
import { FaBook, FaComment, FaTrophy, FaCheckCircle } from "react-icons/fa"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import Card from "../components/Card"
import Modul from "../models/Modul"
import Materi from "../models/Materi";

import huruf from "../data/huruf.json";

function Belajar() {
  const [selectedModul, setSelectedModul] = useState<Modul | null>(null);
  const [currentLearningIndex, setCurrentLearningIndex] = useState<number | null>(null);
  const [finishedLetter, setFinishedLetter] = useState<string[]>([]);

  const letterImages: Record<string, string> = import.meta.glob('../assets/huruf/*.png', { eager: true, import: 'default' });

  const modulHuruf = new Modul(
    'huruf',
    'Belajar huruf',
    'Pelajari isyarat untuk huruf A-Z',
    huruf.map(item =>
      new Materi(
        item.huruf,
        item.deskripsi,
        finishedLetter.includes(item.huruf),
        letterImages[`../assets/huruf/${item.huruf}.png`] as string,
        '')
    ),
    <FaBook className="text-white w-6 h-6" />
  );

  const modulKata = new Modul(
    'kata',
    'Belajar kata',
    'Pelajari kata dasar yang digunakan sehari-hari',
    [],
    <FaComment className="text-white  w-6 h-6" />
  );

  const currentItem = selectedModul?.materi[currentLearningIndex || 0];

  const chartData = [
    {
      quiz: 'Kuis 1',
      skor: 2,
      maksimal: 5,
      persentase: ((2 / 5) * 100).toFixed(0),
    },
    {
      quiz: 'Kuis 2',
      skor: 5,
      maksimal: 5,
      persentase: ((5 / 5) * 100).toFixed(0),
    },
  ]

  useEffect(() => {
    window.api.getModule("huruf").then(result => {
      setFinishedLetter(result.finished)
    });
  }, [])
  return (
    <div className="container mx-auto pt-8">

      {
        !selectedModul ? (
          <>
            <header className="mb-8 text-center">
              <h1 className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✨ Halaman Belajar ✨</h1>
              <p className="text-gray-700">Pilih modul pembelajaran untuk memulai petualangan!</p>
            </header>

            <div className="grid grid-cols-[40%_57%] gap-10">
              <div className="grid grid-cols-1 gap-2">
                  <Card
                    key={modulHuruf.getId}
                    judul={modulHuruf.getJudul}
                    deskripsi={modulHuruf.getDeskripsi}
                    selesai={modulHuruf.getJumlahSelesai}
                    jumlah={modulHuruf.getJumlahPelajaran}
                    icon={modulHuruf.icon}
                    onClick={() => { setSelectedModul(modulHuruf); }}
                  />
                  <Card
                    key={modulKata.getId}
                    judul={modulKata.getJudul}
                    deskripsi={modulKata.getDeskripsi}
                    selesai={modulKata.getJumlahSelesai}
                    jumlah={modulKata.getJumlahPelajaran}
                    icon={modulKata.icon}
                    onClick={() => { setSelectedModul(modulKata); }}
                  />
              </div>

              <div className="grid  gap-y-6">

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border-2 shadow-lg bg-card text-card-foreground border-white bg-linear-to-br from-yellow-50 to-orange-50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-linear-to-br from-pink-400 to-rose-500 rounded-xl shadow-md">
                        <FaTrophy className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-gray-700">Item dipelajari</p>
                        <p className="text-gray-800">1 / 50</p>
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
                        <p className="text-gray-800">25%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-yellow-50 to-orange-50 border-2 shadow-lg border-white h-fit">
                  <h2 className="text-gray-800 ">📈 Grafik Perkembangan Skor Kuis</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
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
                          <img
                            src={currentItem?.getGambar}
                            alt={`Bahasa isyarat untuk ${currentItem?.getId}`}
                            className="w-64 h-64 object-contain rounded-xl"
                          />
                          <div className={`absolute -top-3 -right-3 px-4 py-2 rounded-full bg-linear-to-br from-yellow-50 to-orange-50 text-white shadow-lg`}>
                            <span className="text-xl text-black">
                              {currentItem?.getId.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-8 text-center">
                  <h2 className="text-gray-800 mb-2">
                    ⭐ Huruf {currentItem?.getId.toUpperCase()} ⭐
                  </h2>
                  <p className="text-gray-700">
                    {currentItem?.getDeskripsi}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="mt-6">
                <progress max={26} value={1} className="rounded-full overflow-hidden w-full h-5
                  bg-gray-300
                  [&::-webkit-progress-bar]:bg-gray-300
                  [&::-webkit-progress-value]:bg-gray-800
                  [&::-moz-progress-bar]:bg-gray-800"></progress>
                <p className="text-center mt-2 text-gray-700">
                  🚀 Kamu sudah belajar {currentLearningIndex + 1} dari {selectedModul?.materi?.length} item!
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setCurrentLearningIndex(() => currentLearningIndex - 1)}
                  disabled={currentLearningIndex === 0}
                  aria-label="Item sebelumnya"
                  className="bg-white text-black border-0 not-disabled:hover:scale-110 transition-transform shadow-lg h-fit px-5 py-2 rounded-md disabled:opacity-30"
                >
                  ⬅️ Sebelumnya
                </button>
                <button
                  onClick={() => setCurrentLearningIndex(() => currentLearningIndex + 1)}
                  disabled={currentLearningIndex >= ((selectedModul?.materi?.length ?? 0) - 1)}
                  className="bg-white text-black border-0 not-disabled:hover:scale-110 transition-transform shadow-lg h-fit px-5 py-2 rounded-md disabled:opacity-30"
                  aria-label={
                    currentLearningIndex === ((selectedModul?.materi?.length ?? 0) - 1)
                      ? 'Selesai'
                      : 'Selanjutnya'
                  }
                >
                  {currentLearningIndex === ((selectedModul?.materi?.length ?? 0) - 1)
                    ? '🎊 Selesai'
                    : 'Selanjutnya ➡️'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
                  onClick={() => { setCurrentLearningIndex(null); setSelectedModul(null) }}
                  className="hover:scale-105 hover:bg-gray-100 transition-transform px-5 py-2 bg-white text-black"
                  aria-label="Kembali ke halaman utama" 
                >
                  ← Kembali ke Halaman Utama
                </button>

            <header className="mb-6 text-center">
              <h1 className={`bg-gray-700 bg-clip-text text-transparent mb-2`}>
                {selectedModul?.getJudul}
              </h1>
              <p className="text-gray-700">{selectedModul?.getDeskripsi}</p>
              <div className="mt-4 max-w-md mx-auto">
                {/* <Progress
                  value={getModuleProgress(selectedModule!)}
                  aria-label={`Progress modul: ${Math.round(getModuleProgress(selectedModule!))}%`}
                  className="h-3 shadow-md"
                />
                <p className="text-gray-700 mt-2">
                  🎯 Progress: {completedItems[selectedModule!]?.size || 0} / {selectedModul?.items.length}
                </p> */}
                <progress max={26} value={1} className="rounded-full overflow-hidden w-full h-3
                  bg-gray-300
                  [&::-webkit-progress-bar]:bg-gray-300
                  [&::-webkit-progress-value]:bg-gray-800
                  [&::-moz-progress-bar]:bg-gray-800"></progress>
                <p className="text-center mt-2 text-gray-700">
                  🎯 Progress: 0 / 0
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-6">
              {selectedModul?.materi.map((item, index) => {
                const colors = ['from-pink-200 to-rose-200', 'from-blue-200 to-cyan-200', 'from-purple-200 to-indigo-200', 'from-orange-200 to-yellow-200', 'from-green-200 to-emerald-200'];
                const bgColor = colors[index % colors.length];

                return (
                  <div key={item.getId} >
                    <div
                      className={`relative p-4 cursor-pointer border-2 h-fit rounded-xl border-gray-300  hover:shadow-2xs hover:scale-90 transition-all bg-linear-to-br ${bgColor} ${item.getSelesai ? 'ring-4 ring-green-400 shadow-green-200' : 'hover:border-white'}`}
                      onClick={() => { setCurrentLearningIndex(index); item.setSelesai = true; console.log(modulHuruf) }}
                    >
                      {item.getSelesai && (
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
                          <img
                            src={item.getGambar}
                            alt={`Isyarat ${item.getId}`}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                        <p className="text-gray-800">{item.getId.toUpperCase()}</p>
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

export default Belajar;