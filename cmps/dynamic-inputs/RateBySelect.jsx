export function RateBySelect({ val, onSelected }) {
  const selectStyle = {
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    marginTop: '10px',
    marginBottom: '10px',
  }

  const optionStyle = {
    padding: '6px',
    fontSize: '15px',
  }

  return (
    <select style={selectStyle} value={val} onChange={(e) => onSelected(e.target.value)}>
      <option style={optionStyle} value="1">1 - Poor</option>
      <option style={optionStyle} value="2">2 - Fair</option>
      <option style={optionStyle} value="3">3 - Good</option>
      <option style={optionStyle} value="4">4 - Very Good</option>
      <option style={optionStyle} value="5">5 - Excellent</option>
    </select>
  )
}
