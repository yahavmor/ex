const { useNavigate, useParams } = ReactRouterDOM
const { Link, Outlet } = ReactRouterDOM
import { RateBySelect } from "../cmps/dynamic-inputs/RateBySelect.jsx"
import { RateByTextbox } from "../cmps/dynamic-inputs/RateByTextBox.jsx"
import { RateByStars } from "../cmps/dynamic-inputs/RateByStars.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { BookService } from "../services/book.service.js"






const { useState, useEffect } = React

export function BookDetails() {
    const navigate = ReactRouterDOM.useNavigate()
    const { bookId } = ReactRouterDOM.useParams()
    const [book, setBook] = useState(null)
    const [cmpType, setCmpType] = useState('select')
    const [ratingVal, setRatingVal] = useState('')

    useEffect(() => {
        loadBook(bookId)
    }, [bookId])

        function loadBook(bookId) {
            BookService.getNextPrevBookId(bookId)
                .then(book => setBook(book))
                .catch(err => console.log('err:', err))
        }

    function onDeleteReview(reviewId) {
        BookService.deleteReview(bookId, reviewId)
            .then(() => loadBook(bookId))
            .catch(err => console.log('err:', err))
    }
    function onSelected(newVal) {
        setRatingVal(newVal)
        console.log('Rating selected:', newVal)
    }

        if (!book) return <div>Loading Details...</div>


    const { title, authors, publishedDate, description, thumbnail, listPrice, reviews , prevBook , nextBook} = book
    return (
        <section className="book-details-modal">
            <div>
                <button><Link to={`/book/${prevBook.id}`}>⬅️ Previous book</Link></button>
                <button><Link to={`/book/${nextBook.id}`}> Next book ➡️</Link></button>
            </div>

            <h1 className="title">Book title: {title}</h1>
            <h3 className="authors">By: {authors.join(',')}</h3>
            <h4 className="publish">Published: {publishedDate}</h4>
            <img className="image" src={thumbnail} alt="Book Image" />
            <h4 className="price">Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <LongTxt txt={description}/>

            <div>
            <label>
                <input
                type="radio"
                name="ratingType"
                value="select"
                checked={cmpType === 'select'}
                onChange={(ev) => setCmpType(ev.target.value)}
                />
                Rate By Select
            </label>
            <label>
                <input
                type="radio"
                name="ratingType"
                value="textBox"
                checked={cmpType === 'textBox'}
                onChange={(ev) => setCmpType(ev.target.value)}
                />
                Rate By Free Text
            </label>
            <label>
                <input
                type="radio"
                name="ratingType"
                value="stars"
                checked={cmpType === 'stars'}
                onChange={(ev) => setCmpType(ev.target.value)}
                />
                Rate By Stars
            </label>
            </div>
            <DynamicCmp
                cmpType={cmpType}
                val={ratingVal}
                onSelected={onSelected}
            />
            <div className="divider">
                <span>Or</span>
            </div>
            <button><Link to={`/book/${book.id}/review`}>Add a permanent review</Link></button>
            <button className="back" onClick={() => navigate('/book')}>Back</button>
            <Outlet context={{ reloadBook: () => loadBook(bookId) }} />

            <div className="reviews-container">
            <h3>Reviews:</h3>
            {reviews && reviews.length > 0 ? (
                <ul>
                {reviews.map((rev, idx) => (
                    <li key={idx}>
                    <strong>{rev.fullName}</strong> rated it {'⭐'.repeat(rev.rating)} on <strong>{rev.date}</strong> 
                    <p>"{rev.freeTxt}"</p>
                    <button onClick={()=>onDeleteReview(rev.id)}>Delete</button>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No reviews yet. Be the first to add one!</p>
            )}
            </div>
        </section>

    )

function DynamicCmp({ cmpType, val, onSelected }) {
  const dynamicCmpMap = {
    select: <RateBySelect val={val} onSelected={onSelected} />,
    textBox: <RateByTextbox val={val} onSelected={onSelected} />,
    stars: <RateByStars val={val} onSelected={onSelected} />,
  }
  return dynamicCmpMap[cmpType]
}
}