import { BookService } from "../services/book.service.js"
import { showErrorMsg , showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

import {BookPreview} from "./BookPreview.jsx"




const { useNavigate} = ReactRouterDOM
const { useState } = React

export function BookAdd() {
    const [books, setBooks] = useState([])
    const navigate = useNavigate()



const debouncedSetSearchTerm = utilService.debounce((value) => {
    BookService.getBookFromGoogle(value)
        .then((books) => {
            setBooks(books.slice(0, 5))  
            showSuccessMsg('Books loaded')
        })
        .catch(() => showErrorMsg('Cannot load books'))
}, 800)

        
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
                {books.map((book) => {
                    if (!book.title) return null
                    return (
                    <section key={book.id || book.title}> 
                        <li> 
                        <BookPreview book={book} />
                        <button onClick={() => handleAddBook(book)}>Add to Library</button>
                        </li>
                    </section>
                    )
                })}
            </ul>
        </section>
    )
}

