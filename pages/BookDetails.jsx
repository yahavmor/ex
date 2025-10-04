const { useNavigate, useParams } = ReactRouterDOM
const { Link, Outlet } = ReactRouterDOM
import { LongTxt } from "../cmps/LongTxt.jsx"
import { BookService } from "../services/book.service.js"


const { useState, useEffect } = React

export function BookDetails() {
    const navigate = ReactRouterDOM.useNavigate()
    const { bookId } = ReactRouterDOM.useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook(bookId)
    }, [bookId])

    function loadBook(bookId) {
        BookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
    }

    if (!book) return <div>Loading Details...</div>
    const { title, authors, publishedDate, description, thumbnail, listPrice, reviews} = book
    return (
        <section className="book-details-modal">
            <h1 className="title">Book title: {title}</h1>
            <h3 className="authors">By: {authors.join(',')}</h3>
            <h4 className="publish">Published: {publishedDate}</h4>
            <img className="image" src={thumbnail} alt="Book Image" />
            <h4 className="price">Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <LongTxt txt={description}/>
            <button><Link to={`/book/${book.id}/review`}>Add review</Link></button>
            <button className="back" onClick={() => navigate('/book')}>Back</button>
            <Outlet />

            <div className="reviews-container">
            <h3>Reviews:</h3>
            {reviews && reviews.length > 0 ? (
                <ul>
                {reviews.map((rev, idx) => (
                    <li key={idx}>
                    <strong>{rev.fullName}</strong> rated it {rev.rating}/5 on {rev.date}
                    </li>
                ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
            </div>
        </section>

    )
}