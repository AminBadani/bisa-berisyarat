function Card({ judul, deskripsi, selesai, jumlah, ikon }: { judul: string, deskripsi: string, selesai: number, jumlah: number, ikon: any }) {
  return (
    <div className="bg-card text-card-foreground flex flex-col rounded-xl border p-4 cursor-pointer hover:shadow-2xl transition-all h-full border-white bg-linear-to-br from-blue-100 to-cyan-100">
      <div className="flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-linear-to-br from-pink-400 to-rose-500 shadow-lg`}>
            {ikon}
          </div>
        </div>
        <h2 className="mb-2 text-gray-800">{judul}</h2>
        <p className="text-gray-700 mb-5">{deskripsi}</p>
        <div className="space-y-2">
          <progress max={jumlah} value={selesai + 10} className="rounded-full overflow-hidden w-full h-2
            bg-gray-300
            [&::-webkit-progress-bar]:bg-gray-300
            [&::-webkit-progress-value]:bg-gray-800
            [&::-moz-progress-bar]:bg-gray-800"></progress>
          <p className="text-gray-600">
            🎯 {selesai} / {jumlah} selesai
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;