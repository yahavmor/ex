const { useState, useEffect } = React
export function LongTxt({ txt, maxLength = 40 }) {
    const isOver = txt.length > maxLength
    const [isLong, setIsLong] = useState(false)

    function toggleLong() {
        setIsLong(prev => !prev)
    }

    if (!isOver) return <p className="book-description-modal">{txt}</p>

    return (
        <div className="book-description-modal">
            {isLong ? txt : txt.slice(0, maxLength) + '...'}
            <button className="btn-readmore" onClick={toggleLong}>
                {isLong ? 'Read less' : 'Read more'}
            </button>
        </div>
    )
}