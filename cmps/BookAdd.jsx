import { BookService } from "../services/book.service.js"
import { showErrorMsg , showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM
const { Link } = ReactRouterDOM
const { useState, useEffect } = React



export function BookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [books, setBooks] = useState([])


       const debouncedSetSearchTerm = utilService.debounce((value) => {
        BookService.getBookFromGoogle(value)
            .then((books) => {
                setBooks(books)
                showSuccessMsg('Books loaded')
            })
            .catch(() => showErrorMsg('Cannot load books'))
        }, 2000)
        
    function handleChange({ target }) {
        debouncedSetSearchTerm(target.value)
    }
   return (
        <section className="add-container">
            <h1>Add book from GOOGLE</h1>
            <input type="text" placeholder="search for a book" onChange={handleChange} />
            <button><Link to="/book/">Search</Link></button>

            <ul className="book-list">
                {books.map((book, idx) => {
                    const volumeInfo = book.volumeInfo || book 
                    if (!volumeInfo || !volumeInfo.title) return null

                    return (
                        <li key={idx} className="book-preview">
                            <h3>{volumeInfo.title}</h3>
                        </li>
                    )
                })}
            </ul>

        </section>
    )
}

