export function RateByTextbox({ val, onSelected }) {
  const inputStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px 14px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fdfdfd',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    marginTop: '10px',
    marginBottom: '10px',
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = '#007BFF'
    e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.3)'
  }

  const handleBlur = (e) => {
    e.target.style.borderColor = '#ccc'
    e.target.style.boxShadow = 'none'
  }

  return (
    <input
      type="text"
      value={val}
      placeholder="What do you think about the book?"
      onChange={(e) => onSelected(e.target.value)}
      style={inputStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}
