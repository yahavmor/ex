import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/bookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import {DeletionModal} from '../cmps/DeletionModal.jsx'



const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [showDeletionModal, setShowDeletionModal] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)


    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then((books)=>{setBooks(books)} )
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        setBookToDelete(bookId)
        setShowDeletionModal(true)
    }

    function handleConfirmDelete() {
        bookService.remove(bookToDelete)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookToDelete))
                setShowDeletionModal(false)
                setBookToDelete(null)
            })
            .catch(err => console.log('err:', err))
    }

    function handleCancelDelete() {
        setShowDeletionModal(false)
        setBookToDelete(null)
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }


    if (!books) return <div className="loading">Loading...</div>

    if (showDeletionModal) {
        return (
            <section className="book-index">
                <DeletionModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            </section>
        )
    }

    return (
        <section className="book-index">
            {selectedBookId
                ? <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
                : <Fragment>
                    <BookFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            }
        </section>
    )
}

