import Card from "../components/Card"

function Belajar() {
  const modul = [
    {
      id: 'huruf',
      title: 'Belajar huruf',
      description: 'Pelajari isyarat untuk huruf A-Z',
      completed: 5,
      count: 26,
    },
    {
      id: 'kata',
      title: 'Belajar kata sehari-hari',
      description: 'Pelajari kata yang sering digunakan',
      completed: 1,
      count: 10,
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✨ Halaman Belajar ✨</h1>
        <p className="text-gray-700">Pilih modul pembelajaran untuk memulai petualangan!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          modul.map((item) => {
            return (
              <Card judul={item.title} deskripsi={item.description} selesai={item.completed} jumlah={item.count} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Belajar