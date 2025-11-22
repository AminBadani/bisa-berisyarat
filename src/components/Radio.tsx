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
      <label className="inline-flex w-full text-body border-2 border-gray-400 rounded-md cursor-pointer peer-checked:border-white peer-checked:bg-blue-400 peer-checked:hover:bg-blue-400 hover:bg-neutral-100 shadow-xs">
        {
          (tipe == 'choose-letter') ?
            (
              <div className="w-full font-bold text-center m-5 text-3xl">{label.toUpperCase()}</div>
            ) : (
              <img
                src={label}
                className="w-30 h-30 object-contain m-auto"
              />

            )
        }
      </label>
    </div>
  )
}

export default Radio