import { useState } from "react";
import { FaAward, FaChartLine, FaStar, FaTrophy } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useModulStore } from "../store/modulStore";

function Progress() {
  const [statistik, setStatistik] = useState('belajar');
  const { modules } = useModulStore();

  const learningChartData = [
    {
      name: "Huruf",
      selesai: 14,
      total: 26,
      persentase: (14 / 26 * 100).toFixed(0),
    },
    {
      name: "Kata",
      selesai: 0,
      total: 10,
      persentase: (0 / 10 * 100).toFixed(0),
    }
  ]

  const quizChartData = [
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

  return (
    <div className="container mx-auto pt-8">
      <header className="mb-8 text-center">
        <h1 className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          📊 Perkembangan Belajar 📊
        </h1>
        <p className="text-gray-700">Lihat statistik dan riwayat belajar & kuis Anda! 🌟</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-linear-to-br from-pink-100 to-rose-100 border-2 shadow-lg bg-card text-card-foreground border-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-pink-400 to-rose-500 rounded-xl shadow-md">
              <FaStar className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-gray-700">Item Dipelajari</p>
              <p className="text-gray-800">{modules[0].countFinished + modules[1].countFinished} / {modules[0].countMaterials + modules[1].countMaterials}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-linear-to-br from-blue-100 to-cyan-100 border-2 shadow-lg bg-card text-card-foreground border-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-blue-400 to-cyan-500 rounded-xl shadow-md">
              <FaAward className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-gray-700">Progress Belajar</p>
              <p className="text-gray-800">{((modules[0].countFinished + modules[1].countFinished) / (modules[0].countMaterials + modules[1].countMaterials) * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-linear-to-br from-green-100 to-emerald-100 border-2 shadow-lg bg-card text-card-foreground border-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-green-400 to-emerald-500 rounded-xl shadow-md">
              <FaTrophy className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-gray-700">Total Kuis</p>
              <p className="text-gray-800">{10}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-linear-to-br from-purple-100 to-pink-100 border-2 shadow-lg bg-card text-card-foreground border-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl shadow-md">
              <FaChartLine className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-gray-700">Rata-rata Skor Kuis</p>
              <p className="text-gray-800">{10}%</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="text-center text-body flex gap-2">
        <li className={`w-full text-body bg-gray-100 py-1 rounded-full hover:cursor-pointer ${statistik == 'belajar' ? 'bg-white' : ''}`} onClick={() => setStatistik('belajar')}>
          📚 Statistik Belajar
        </li>
        <li className={`w-full text-body bg-gray-100 py-1 rounded-full hover:cursor-pointer ${statistik == 'kuis' ? 'bg-white' : ''}`} onClick={() => setStatistik('kuis')}>
          🏆 Statistik Kuis
        </li>
      </ul>

      {
        statistik == 'belajar' ?
          (
            <div className="pb-5">
              <div className="p-6 my-8 bg-linear-to-br from-pink-50 to-purple-50 border-2 shadow-lg border-white gray">
                <h2 className="text-gray-800 mb-6">📊 Progress Belajar Per Modul</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={learningChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border">
                              <p className="text-gray-800 mb-1">{payload[0].payload.name}</p>
                              <p className="text-purple-600">
                                Selesai: {payload[0].payload.selesai} / {payload[0].payload.total}
                              </p>
                              <p className="text-gray-600">Progress: {payload[0].payload.persentase}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="selesai" fill="#a855f7" name="Item Selesai" />
                    <Bar dataKey="total" fill="#05df72" name="Total Item" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-6 bg-linear-to-br from-pink-50 to-purple-50 border-2 shadow-lg border-white">
                <h2 className="text-gray-800 mb-6">📖 Detail Per Modul</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map((modules, index) => {
                    const Icon = modules.icon;
                    const completed = modules.countFinished;
                    const percentage = ((completed / modules.countMaterials) * 100).toFixed(0);

                    return (
                      <div key={index}>
                        <div className="p-4 border-white border-2 bg-linear-to-br from-blue-100 to-cyan-100 shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-linear-to-br from-pink-400 to-rose-500">
                              {Icon}
                            </div>
                            <h3 className="text-gray-800">{modules.title}</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-gray-700">
                              <span>Progress:</span>
                              <span className="font-bold">{completed} / {modules.countMaterials}</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-3 shadow-inner">
                              <div
                                className="h-3 rounded-full bg-linear-to-r from-pink-400 to-rose-500 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <p className="text-right text-gray-600">{percentage}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-6 my-8 bg-linear-to-br from-pink-50 to-purple-50 border-2 shadow-lg border-white gray">
                <h2 className="text-gray-800 mb-6">📈 Grafik Perkembangan Skor Kuis</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={quizChartData}>
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

              {/* <div className="p-6 bg-linear-to-br from-blue-50 to-cyan-50 border-2 shadow-lg">
                <h2 className="text-gray-800 mb-6">📖 Detail Per Modul</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduless.map((modules, index) => {
                    const Icon = modules.icon;
                    const completed = learningStats[modules.id] || 0;
                    const percentage = ((completed / modules.total) * 100).toFixed(0);

                    return (
                      <div
                        key={modules.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`p-4 ${modules.bgColor} border-2 shadow-md`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-linear-to-br ${modules.color}`}>
                              <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-gray-800">{modules.title}</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-gray-700">
                              <span>Progress:</span>
                              <span className="font-bold">{completed} / {modules.total}</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-3 shadow-inner">
                              <div
                                className={`h-3 rounded-full bg-linear-to-r ${modules.color} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <p className="text-right text-gray-600">{percentage}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          )
      }

      {/* <Tabs defaultValue="belajar" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="belajar" className="text-base">📚 Statistik Belajar</TabsTrigger>
          <TabsTrigger value="kuis" className="text-base">🏆 Statistik Kuis</TabsTrigger>
        </TabsList>

        <TabsContent value="belajar">
          <div className="p-6 mb-8 bg-linear-to-br from-pink-50 to-purple-50 border-2 shadow-lg">
            <h2 className="text-gray-800 mb-6">📊 Progress Belajar Per Modul</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={learningChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border">
                          <p className="text-gray-800 mb-1">{payload[0].payload.name}</p>
                          <p className="text-purple-600">
                            Selesai: {payload[0].payload.selesai} / {payload[0].payload.total}
                          </p>
                          <p className="text-gray-600">Progress: {payload[0].payload.persentase}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="selesai" fill="#a855f7" name="Item Selesai" />
                <Bar dataKey="total" fill="#e9d5ff" name="Total Item" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-linear-to-br from-blue-50 to-cyan-50 border-2 shadow-lg">
            <h2 className="text-gray-800 mb-6">📖 Detail Per Modul</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moduless.map((modules, index) => {
                const Icon = modules.icon;
                const completed = learningStats[modules.id] || 0;
                const percentage = ((completed / modules.total) * 100).toFixed(0);

                return (
                  <div
                    key={modules.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`p-4 ${modules.bgColor} border-2 shadow-md`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-linear-to-br ${modules.color}`}>
                          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-gray-800">{modules.title}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-700">
                          <span>Progress:</span>
                          <span className="font-bold">{completed} / {modules.total}</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-3 shadow-inner">
                          <div
                            className={`h-3 rounded-full bg-linear-to-r ${modules.color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-right text-gray-600">{percentage}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="kuis">
          {quizHistory.length > 0 ? (
            <>
              <div className="p-6 mb-8 bg-linear-to-br from-yellow-50 to-orange-50 border-2 shadow-lg">
                <h2 className="text-gray-800 mb-6">📈 Grafik Perkembangan Skor Kuis</h2>
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
                        return null;
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

              <div className="p-6 bg-linear-to-br from-green-50 to-emerald-50 border-2 shadow-lg">
                <h2 className="text-gray-800 mb-6">📝 Riwayat Kuis</h2>
                <div className="space-y-4">
                  {quizHistory.slice().reverse().map((result, index) => {
                    const percentage = ((result.score / result.total) * 100).toFixed(0);
                    const actualIndex = quizHistory.length - index;

                    return (
                      <div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white border-2 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${parseInt(percentage) >= 80
                              ? 'bg-linear-to-br from-green-400 to-emerald-500'
                              : parseInt(percentage) >= 60
                                ? 'bg-linear-to-br from-blue-400 to-cyan-500'
                                : 'bg-linear-to-br from-orange-400 to-yellow-500'
                            }`}>
                            <Trophy className="w-5 h-5 text-white" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-gray-800">🎯 Kuis #{actualIndex}</p>
                            <p className="text-gray-600">📅 {formatDate(result.date)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-800">
                            {result.score} / {result.total}
                          </p>
                          <p
                            className={`px-3 py-1 rounded-full inline-block ${parseInt(percentage) >= 80
                                ? 'bg-green-100 text-green-600'
                                : parseInt(percentage) >= 60
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'bg-orange-100 text-orange-600'
                              }`}
                          >
                            {percentage}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center bg-linear-to-br from-gray-50 to-gray-100 border-2">
              <FaTrophy className="w-16 h-16 text-gray-400 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-gray-800 mb-2">Belum Ada Riwayat Kuis</h2>
              <p className="text-gray-600 mb-6">
                Mulai mengerjakan kuis untuk melihat perkembangan belajar Anda 🎯
              </p>
              <a
                href="/kuis"
                className="inline-block px-6 py-2 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform shadow-lg"
              >
                🚀 Mulai Kuis
              </a>
            </div>
          )}
        </TabsContent>
      </Tabs> */}
    </div>
  )
}

export default Progress;