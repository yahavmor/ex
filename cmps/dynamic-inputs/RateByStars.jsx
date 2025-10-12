export function RateByStars({ val, onSelected }) {
  const stars = [1, 2, 3, 4, 5]

  const starStyle = (star) => ({
    cursor: 'pointer',
    color: star <= val ? '#FFD700' : '#ccc', 
    fontSize: '32px',
    margin: '0 6px',
    transition: 'color 0.3s ease',
  })

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  }

  return (
    <div style={containerStyle}>
      {stars.map((star) => (
        <span
          key={star}
          style={starStyle(star)}
          onClick={() => onSelected(star)}
          onMouseOver={(e) => (e.target.style.color = '#FFD700')}
          onMouseOut={(e) => (e.target.style.color = star <= val ? '#FFD700' : '#ccc')}
        >
          ★
        </span>
      ))}
    </div>
  )
}
