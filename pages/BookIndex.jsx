import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import {DeletionModal} from '../cmps/DeletionModal.jsx'
import { utilService } from "../services/util.service.js"



const { useState, useEffect, Fragment } = React
const { Link , useSearchParams } = ReactRouterDOM


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(BookService.getFilterFromSearchParams(searchParams))

    const [selectedBookId, setSelectedBookId] = useState(null)
    const [showDeletionModal, setShowDeletionModal] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)



    useEffect(() => {
        setSearchParams(utilService.cleanObject(filterBy))
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        BookService.query(filterBy)
            .then((books)=>{setBooks(books)} )
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        setBookToDelete(bookId)
        setShowDeletionModal(true)
    }

    function handleConfirmDelete() {
        BookService.remove(bookToDelete)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookToDelete))
                setShowDeletionModal(false)
                setBookToDelete(null)
                showSuccessMsg('Book deleted')
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

