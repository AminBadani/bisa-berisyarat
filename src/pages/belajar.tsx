import { useEffect } from "react"
import Card from "../components/Card"
import { FaBook, FaComment, FaTrophy } from "react-icons/fa"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function Belajar() {
  const modul = [
    {
      id: 'huruf',
      title: 'Belajar huruf',
      description: 'Pelajari isyarat untuk huruf A-Z',
      completed: 5,
      count: 26,
      icon: <FaBook className="w-8 h-8 text-white" />
    },
    {
      id: 'kata',
      title: 'Belajar kata sehari-hari',
      description: 'Pelajari kata yang sering digunakan',
      completed: 1,
      count: 10,
      icon: <FaComment className="w-8 h-8 text-white" />
    }
  ]

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

  }, [])
  return (
    <div className="container mx-auto pt-8">
      <header className="mb-8 text-center">
        <h1 className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✨ Halaman Belajar ✨</h1>
        <p className="text-gray-700">Pilih modul pembelajaran untuk memulai petualangan!</p>
      </header>

      <div className="grid grid-cols-[40%_57%] gap-10">
        <div className="grid grid-cols-1 gap-2">
          {
            modul.map((item) => {
              return (
                <Card
                  judul={item.title}
                  deskripsi={item.description}
                  selesai={item.completed}
                  jumlah={item.count}
                  ikon={item.icon}
                />
              )
            })
          }
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
    </div>
  )
}

export default Belajar