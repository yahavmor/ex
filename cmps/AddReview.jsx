import { BookService } from "../services/book.service.js"
import { showErrorMsg , showSuccessMsg } from "../services/event-bus.service.js"
const { useNavigate, useParams } = ReactRouterDOM
const { Link } = ReactRouterDOM
const { useState, useEffect } = React


export function AddReview() {
        const { bookId } = useParams()
        const navigate = useNavigate()
        const [bookToReview, setBookToReview] = useState(BookService.getEmptyReview())
    

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        } 
        {
          setBookToReview(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveReview(ev) {
         ev.preventDefault()
        BookService.onSaveReview(bookId,bookToReview)
        .then(() => navigate('/book'))
        .then(() => showSuccessMsg('Review saved'))
        .catch(err => {
            console.log('err:', err)
            navigate('/book')
            showErrorMsg('Cannot save review')
        })
        }
    const { fullName, rating , date } = bookToReview
    return <section className="add-review">
        <h2>Add your review:</h2>
        <form onSubmit={onSaveReview}>
            <label htmlFor="full-name" type="text" name="fullName" id="fullName">Full Name:</label>
            <input value={fullName} type="text" id="full-name" name="fullName" placeholder="Enter your full name" onChange={handleChange} />
            <label htmlFor="rating">Rating:</label>
            <select value={rating} id="rating" name="rating" onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label htmlFor="read-at">Read at:</label>
            <input value={date} type="date" id="read-at" name="date" onChange={handleChange} />
            <button disabled = {!fullName} >Done</button>
        </form>

        </section>
}


