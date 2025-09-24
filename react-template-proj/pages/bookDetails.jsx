import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
    }


    if (!book) return <div>Loading Details...</div>
    const { title, authors , publishedDate , description ,thumbnail , listPrice  } = book
    return (
        <section className="book-details-modal">
            <h1 className="book-title-modal">Book title: {title}</h1>
            <h3 className="book-authors-modal">By: {authors.join(', ')}</h3>
            <h4 className="book-publish-modal">Published: {publishedDate}</h4>
            <img className="book-image-modal" src={thumbnail} alt="Book Image" />
            <h4 className="book-price-modal">Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <p className="book-description-modal">{description}</p>
            <button className="btn-back" onClick={onBack}>Back</button>
        </section>
    )
}