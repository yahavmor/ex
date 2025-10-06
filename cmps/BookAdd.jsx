import { BookService } from "../services/book.service.js"
import { showErrorMsg , showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
const { useNavigate, useParams, useOutletContext } = ReactRouterDOM
const { Link } = ReactRouterDOM
const { useState, useEffect } = React



export function BookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [books, setBooks] = useState([])
    const navigate = useNavigate()



const debouncedSetSearchTerm = utilService.debounce((value) => {
    BookService.getBookFromGoogle(value)
        .then((books) => {
            setBooks(books.slice(0, 5))  
            showSuccessMsg('Books loaded')
        })
        .catch(() => showErrorMsg('Cannot load books'))
}, 500)

        
    function handleChange({ target }) {
        debouncedSetSearchTerm(target.value)
    }
    function handleAddBook(book) {
    BookService.save(book)
        .then(() => showSuccessMsg('Book added successfully!'))
        .catch(() => showErrorMsg('Failed to add book'))
        .finally(() => navigate('/book'))
}

   return (
        <section className="add-container">
            <h1>Add book from GOOGLE</h1>
            <input type="text" placeholder="search for a book" onChange={handleChange} />

            <ul className="book-list">
                {books.map((book, idx) => {
                    if (!book.title) return null

                    return (
                        <li key={idx} className="book-preview">
                            <h3>{book.title}</h3>
                            <button onClick={() => handleAddBook(book)}>Add to Library</button>
                        </li>
                        
                    )
                })}
            </ul>


        </section>
    )
}

