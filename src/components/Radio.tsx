type Props = {
  value: number | string;
  label: string;
  tipe: string;
  checked: boolean;
  onChange?: () => void;
};

function Radio({ value, label, tipe, checked, onChange }: Props) {
  return (
    <div onClick={onChange}>
      <input type="radio" value={value} className="hidden peer" checked={checked} onChange={onChange} />
      <label className="inline-flex w-full p-5 text-body border border-gray-400 rounded-md cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-400 peer-checked:hover:bg-blue-400 hover:bg-neutral-100">
        {
          (tipe == 'pilih-huruf') ?
            (
              <div className="w-full font-bold mb-1 text-center">{label.toUpperCase()}</div>
            ) : (
              <img
                src={label}
                className="w-22 h-22 object-contain m-auto"
              />

            )
        }
      </label>
    </div>
  )
}

export default Radio