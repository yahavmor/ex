const { useNavigate, useParams } = ReactRouterDOM
const { Link, Outlet } = ReactRouterDOM
import { RateBySelect } from "../cmps/dynamic-inputs/RateBySelect.jsx"
import { RateByTextbox } from "../cmps/dynamic-inputs/RateByTextBox.jsx"
import { RateByStars } from "../cmps/dynamic-inputs/RateByStars.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { BookService } from "../services/book.service.js"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { RateOptions } from "../cmps/RateOptions.jsx"
import { BookNavigation } from "../cmps/BookNavigation.jsx"

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
    }

        if (!book) return <div>Loading Details...</div>


    const { description , reviews , prevBook , nextBook} = book
    return (
        <section className="book-details-modal">
            <BookNavigation prevBook={prevBook} nextBook ={nextBook}/>
            <BookPreview book={book} />
            <LongTxt txt={description}/>
            <RateOptions cmpType={cmpType} setCmpType={setCmpType} />
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