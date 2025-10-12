export function RateOptions({ cmpType, setCmpType }) {
  const options = [
    { value: 'select', label: 'Rate By Select' },
    { value: 'textBox', label: 'Rate By Free Text' },
    { value: 'stars', label: 'Rate By Stars' },
  ]

  return (
    <div className="rate-options">
      {options.map(({ value, label }) => (
        <label key={value}>
          <input
            type="radio"
            name="ratingType"
            value={value}
            checked={cmpType === value}
            onChange={() => setCmpType(value)}
          />
          {label}
        </label>
      ))}
    </div>
  )
}   